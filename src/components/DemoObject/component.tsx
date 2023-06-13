import styles from './component.module.scss'
import cx from 'classnames'

import Button from '../Button/component'

import getDemoObject from '@root/api/demoClient'

import React, {forwardRef, useImperativeHandle, useRef} from 'react'

import { useState } from 'react';

import { ObjectInterface, PropertyInterface, ObjectOrPropetyValueInterface } from '@root/utils/interfaces'

const DemoObject = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
    generateObjectFromParent() {
      handleGenerateObject()
    }
  }))

  // get demo object
  const [demoObject, setDemoObject] = useState<ObjectInterface>({
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
        const { properties, name, type, description, color } = data.content;

        const processedProperties: PropertyInterface[] = Object.entries(properties)
          .slice(0,2)
          .map(([key, value], index) => {
          const processedProperty: PropertyInterface = {};

          if (!demoObject.properties[index].name?.locked) {
            processedProperty.name = {
              value: key,
              locked: false, // Set the locked state
            };
          }

          if (!demoObject.properties[index].description?.locked) {
            processedProperty.description = {
              value: String(value),
              locked: false, // Set the locked state
            };
          }

          return processedProperty;
        });

        let processedName, processedType, processedDescription = {}

        if(!demoObject.name?.locked) {
          processedName = {
            value: name,
            locked: false, // Set the locked state
          };
        }

        if(!demoObject.type?.locked) {
          processedType = {
            value: type,
            locked: false, // Set the locked state
          };
        }

        if(!demoObject.description?.locked) {
          processedDescription = {
            value: description,
            locked: false, // Set the locked state
          };
        }

        let processedColor = color;
        if(!isHexColor(data.content.color))
          processedColor = '#307ACE';

        const processedObject: ObjectInterface = {
          properties: processedProperties,
          name: processedName,
          type: processedType,
          description: processedDescription,
          color: processedColor,
        };

        console.log(processedObject)

        setDemoObject(processedObject)
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

  function buildDemoObjectString(demoObject: ObjectInterface) {
    const name = demoObject.name?.value !== undefined ? demoObject.name.value : '-';
    const type = demoObject.type?.value !== undefined ? demoObject.type.value : '-';
    const property1Name = demoObject.properties[0]?.name?.value !== undefined ? demoObject.properties[0].name.value : '-';
    const property2Name = demoObject.properties[1]?.name?.value !== undefined ? demoObject.properties[1].name.value : '-';
    const property1Description = demoObject.properties[0]?.description?.value !== undefined ? demoObject.properties[0].description.value : '-';
    const property2Description = demoObject.properties[1]?.description?.value !== undefined ? demoObject.properties[1].description.value : '-';
    const description = demoObject.description?.value !== undefined ? demoObject.description.value : '-';
  
    return `{"name":"${name}","type":"${type}","properties":{"${property1Name}":"${property1Description}","${property2Name}":"${property2Description}"},"description":"${description}","color":"-"}`;
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
              value={demoObject.name?.value} 
              placeholder='Object name'
              onChange={(e) =>
                setDemoObject((prev) => {
                  if (!prev) return prev
                  return {
                    ...prev,
                    name: { value: e.target.value, locked: prev.name?.locked || false }
                  };
                })
              }
            />
          <input
            className={styles.uniqueInput} 
            value={demoObject.type?.value} 
            type="text" 
            placeholder='Object type' 
            onChange={(e) =>
              setDemoObject((prev) => {
                if (!prev) return prev
                return {
                  ...prev,
                  type: { value: e.target.value, locked: prev.name?.locked || false }
                };
              })
            }
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
                      value={property.name?.value}
                      placeholder={`Property ${index + 1}`}
                      onChange={(e) => {
                        const newKey = e.target.value;
                        setDemoObject(prev => {
                          if (!prev) return prev;
                          const updatedProperties = [...prev.properties];
                          updatedProperties[index] = { ...updatedProperties[index], name: { value: newKey, locked: prev.properties[index].name?.locked || false } };
                          return { ...prev, properties: updatedProperties };
                        });
                      }}
                    />
                    <input
                      type="text"
                      name="property-description"
                      value={property.description?.value}
                      placeholder="Property description"
                      onChange={(e) => {
                        const newValue = e.target.value;
                        setDemoObject(prev => {
                          if (!prev) return prev;
                          const updatedProperties = [...prev.properties];
                          updatedProperties[index] = { ...updatedProperties[index], name: { value: newValue, locked: prev.properties[index].name?.locked || false } };
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
              value={demoObject.description?.value}
              name="description" 
              cols={30} 
              rows={3} 
              placeholder='Object description'
              onChange={(e) => {
                setDemoObject(prev => {
                  if (!prev) return prev;
                  return {
                    ...prev,
                    description: { value: e.target.value, locked: prev.name?.locked || false }
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