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
  const [demoObject, setDemoObject] = useState<DemoObjectInterface>({
    name: undefined,
    properties: [{ name: undefined, description: undefined }, { name: undefined, description: undefined }],
    type: undefined,
    description: undefined,
    color: undefined,
  });
  
  const [loading, setLoading] = useState(false)

  const handleGenerateObject = () => {
    setLoading(true)
    async function fetchData() {
      const data = await getDemoObject();
      if(data.status === 'success') {
        data.content.properties = Object.entries(data.content.properties).map(([key, value]) => ({
          name: key,
          description: value
        }))
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

  function buildDemoObjectString(demoObject: DemoObjectInterface) {
    const name = demoObject.name !== undefined ? demoObject.name : '-';
    const type = demoObject.type !== undefined ? demoObject.type : '-';
    const property1Name = demoObject.properties[0]?.name !== undefined ? demoObject.properties[0]?.name : '-';
    const property2Name = demoObject.properties[1]?.name !== undefined ? demoObject.properties[1]?.name : '-';
    const property1Description = demoObject.properties[0]?.description !== undefined ? demoObject.properties[0]?.description : '-';
    const property2Description = demoObject.properties[1]?.description !== undefined ? demoObject.properties[1]?.description : '-';
    const description = demoObject.description !== undefined ? demoObject.description : '-';
    const color = demoObject.color !== undefined ? demoObject.color : '-';
  
    return `{"name":"${name}","type":"${type}","properties":{"${property1Name}":"${property1Description}","${property2Name}":"${property2Description}"},"description":"${description}","color":"${color}"}`;
  }  

  return(
    <div className={styles.object}>
      <h2>World-building Object Generator</h2>
      <div className={styles.form}>
        { loading && <div className={cx(styles.loadingAnimation, { [styles.fadeIn] : loading })}>
          <div className={styles.loadingCircle}></div>
          <div className={styles.loadingCircle}></div>
          <div className={styles.loadingCircle}></div>
        </div> }
        <div className={styles.colorWrapper}>
          <div className={cx(styles.color, { [styles.loading] : loading })} style={{backgroundColor: demoObject?.color}}></div>
        </div>
        <div className={styles.content}>
          <div className={styles.details}>
            <h5>Object details</h5>
            <input
              type="text" 
              value={demoObject?.name} 
              placeholder='Object name'
              onChange={(e) => setDemoObject((prev) => {
                if (!prev) {
                  return {
                    name: e.target.value,
                    properties: [],
                    type: '',
                    description: '',
                    color: ''
                  };
                }
                return {
                  ...prev,
                  name: e.target.value
                };
              })}
            />
          <input
            className={styles.uniqueInput} 
            value={demoObject.type} 
            type="text" 
            placeholder='Object type' 
            onChange={(e) => setDemoObject((prev) => {
              if (!prev) {
                return {
                  name: '',
                  properties: [],
                  type: e.target.value,
                  description: '',
                  color: ''
                };
              }
              return {
                ...prev,
                type: e.target.value
              };
            })}
          />
          </div>
          <div>
            <h5>Properties</h5>
            <div className={styles.propertyGroup}>
              {
                demoObject?.properties && demoObject.properties.map((property, index) => (
                  <div key={index} className={styles.property}>
                    <input
                      type="text"
                      name="property-name"
                      value={property.name}
                      placeholder={`Property ${index + 1}`}
                      onChange={(e) => {
                        const newKey = e.target.value;
                        setDemoObject(prev => {
                          if (!prev) return prev;
                          const updatedProperties = [...prev.properties];
                          updatedProperties[index] = { ...updatedProperties[index], name: newKey };
                          return { ...prev, properties: updatedProperties };
                        });
                      }}
                    />
                    <input
                      type="text"
                      name="property-description"
                      value={property.description}
                      placeholder="Property description"
                      onChange={(e) => {
                        const newValue = e.target.value;
                        setDemoObject(prev => {
                          if (!prev) return prev;
                          const updatedProperties = [...prev.properties];
                          updatedProperties[index] = { ...updatedProperties[index], description: newValue };
                          return { ...prev, properties: updatedProperties };
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
                    <input type="text" name="property-description" placeholder='Property description'/>
                  </div>
                  <div className={styles.property}>
                    <input type="text" name="property-name" placeholder='Property 2'/>
                    <input type="text" name="property-description" placeholder='Property description'/>
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
              cols={30} 
              rows={3} 
              placeholder='Object description'
              onChange={(e) => {
                setDemoObject(prev => {
                  if (!prev) return prev;
                  return {
                    ...prev,
                    description: e.target.value
                  };
                });
              }}
            ></textarea>
          </div>
        </div>
      </div>
      <Button content='Generate an object' click={handleGenerateObject} />
    </div>
  )
})

DemoObject.displayName = 'DemoObject';

export default DemoObject