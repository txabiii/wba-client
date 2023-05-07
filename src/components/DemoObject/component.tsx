import styles from './component.module.scss'
import cx from 'classnames'

import Button from '../Button/component'

import getDemoObject from '@root/api/demoClient'

import React, {forwardRef, useImperativeHandle, useRef} from 'react'

import { useState } from 'react';

import { DemoObjectInterface } from '@root/utils/interfaces'

const DemoObject = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
    generateObjectFromParent() {
      handleGenerateObject()
    }
  }))

  // get demo object
  const [demoObject, setDemoObject] = useState<DemoObjectInterface>()
  const [loading, setLoading] = useState(false)

  const handleGenerateObject = () => {
    setLoading(true)
    async function fetchData() {
      const data = await getDemoObject();
      if(data.status === 'success') {
        const propertiesArray = Object.entries(data.content.properties).map(([key, value]) => ({
          name: key,
          description: value
        }))
        data.content.properties = propertiesArray
        data.content.type = data.content.type.charAt(0).toUpperCase() + data.content.type.slice(1)

        if(!isHexColor(data.content.color))
          data.content.color = '#307ACE';

        setDemoObject(data.content)
      } else {
        console.log(data.content)
      }
      setLoading(false)
    }
    fetchData();
  }

  function isHexColor(value: string): boolean {
    const hexRegex = /^#([0-9A-Fa-f]{3}){1,2}$/i;
    return hexRegex.test(value);
  }

  return(
    <div className={styles.object}>
      <h2>See for yourself</h2>
      <div className={styles.form}>
        { loading && <div className={cx(styles.loadingAnimation, { [styles.fadeIn] : loading })}>
          <div className={styles.loadingCircle}></div>
          <div className={styles.loadingCircle}></div>
          <div className={styles.loadingCircle}></div>
        </div>}
        <div className={styles.colorWrapper}>
          <div className={cx(styles.color, { [styles.loading] : loading })} style={{backgroundColor: demoObject?.color}}></div>
        </div>
        <div className={styles.content}>
          <div className={styles.details}>
            <h5>Object details</h5>
            <input
              type="text" 
              value={demoObject?.name} 
              placeholder='Write the name of your object'
              onChange={(e)=>setDemoObject((prev) => {
                if(!prev) return;
                return {
                  ...prev,
                  name: e.target.value
                }
              })}
            />
            <input
              className={styles.uniqueInput} 
              value={demoObject?.type} 
              type="text" 
              placeholder='My object is a...' 
              onChange={(e)=>setDemoObject((prev) => {
                if(!prev) return;
                return {
                  ...prev,
                  type: e.target.value
                }
              })}
            />
          </div>
          <div>
            <h5>Properties</h5>
            <div className={styles.propertyGroup}>
              {
                demoObject?.properties && demoObject.properties.map((property, index)=>(
                  <div key={index} className={styles.property}>
                    <input
                      type="text" 
                      name="property-name" 
                      value={property.name} placeholder='Property 1'
                      onChange={(e) => {
                        const newKey = e.target.value;
                        setDemoObject(prev => {
                          if(!prev) return;
                          const updatedProperties = [...prev.properties];
                          updatedProperties[index] = {...updatedProperties[index], name: newKey};
                          return {...prev, properties: updatedProperties};
                        });
                      }}
                    />
                    <input 
                      type="text" 
                      name="property-description" 
                      value={property.description} 
                      placeholder='Describe the property'
                      onChange={(e) => {
                        const newValue = e.target.value;
                        setDemoObject(prev => {
                          if(!prev)return;
                          const updatedProperties = [...prev.properties];
                          updatedProperties[index] = {...updatedProperties[index], description: newValue};
                          return {...prev, properties: updatedProperties};
                        });
                      }}
                    />
                  </div>
                ))
              }
              {
                !demoObject?.properties &&
                <>
                  <div className={styles.property}>
                    <input type="text" name="property-name" placeholder='Property 1'/>
                    <input type="text" name="property-description" placeholder='Describe the property'/>
                  </div>
                  <div className={styles.property}>
                    <input type="text" name="property-name" placeholder='Property 1'/>
                    <input type="text" name="property-description" placeholder='Describe the property'/>
                  </div>
                </>
              }
            </div>
          </div>
          <div className={styles.descriptionWrapper}>
            <h5>Description</h5>
            <textarea 
              value={demoObject?.description}
              name="description" 
              cols={30} rows={3} 
              placeholder='Write the description for your world-building-object...'
              onChange={(e)=>{
                setDemoObject((prev)=>{
                  if(!prev) return;
                  return {
                    ...prev,
                    description: e.target.value
                  }
                })
              }}
              >
            </textarea>
          </div>
        </div>
      </div>
      <div className={styles.buttonWrapper}>
        <Button content='Generate an object' click={handleGenerateObject} />
        <div className={styles.aiOptions}></div>
      </div>
    </div>
  )
})

DemoObject.displayName = 'DemoObject';

export default DemoObject