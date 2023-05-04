'use client';

import styles from './page.module.scss'
import LoginInput from '@root/components/LoginInput/component'
import Button from '@root/components/Button/component'

import Link from 'next/link'

import { useEffect, useRef, useState } from 'react';

import getDemoObject from '@root/api/demoClient';

interface DemoObject {
  name: string,
  properties: { [key: string]: string },
  type: string,
  description: string
}

export default function Home() {
  // Snap effect
  const heroRef = useRef<HTMLDivElement>(null);
  const templateFreeRef = useRef<HTMLDivElement>(null);
  const aiAssistanceRef = useRef<HTMLDivElement>(null);
  const aiControlRef = useRef<HTMLDivElement>(null);


  useEffect(()=>{
    const debouncedSnapToClosest = debounce(snapToClosest, 200)

    window.addEventListener('scroll', debouncedSnapToClosest);

    return () => {
      window.removeEventListener('scroll', debouncedSnapToClosest)
    }
  }, [])

  function snapToClosest() {
    if(heroRef.current && templateFreeRef.current && aiAssistanceRef.current && aiControlRef.current) {
      const elements = [heroRef.current, templateFreeRef.current, aiAssistanceRef.current, aiControlRef.current]
      let closestIndex = 0;

      for(let i = 1; i < elements.length; i++) {
        if(Math.abs(elements[i].getBoundingClientRect().top) < Math.abs(elements[closestIndex].getBoundingClientRect().top) ) {
          closestIndex = i
        }
      }
      
      const closestElement = elements[closestIndex];

      closestElement.scrollIntoView({ behavior: 'smooth'})
    }
  }

  function debounce(func: (...args: any[]) => void, delay: number): (...args: any[]) => void {
    let timeoutId: NodeJS.Timeout;
    return function (...args: any[]) {
      if(timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(()=>{
        func(...args)
      }, delay)
    }
  }

  // get demo object
  const [demoObject, setDemoObject] = useState<DemoObject>()

  const handleGenerateObject = () => {
    async function fetchData() {
      const data = await getDemoObject();
      if(data.status === 'success') {
        setDemoObject(data.content)
        console.log(data.content)
      } else {
        console.log(data.content)
      }
    }
    fetchData();
  }

  return(
    <div className={styles.home}>
      <main>
        {/* HERO SECTION */}
        <section className={styles.feature} ref={heroRef}>
          <div className={styles.top}>
            <div className={styles.header}>
              <div className={styles.brand}>
                <h4>GENIEOUS</h4>
                <h6>CREATIVE WRITING</h6>
              </div>
              <div className={styles.beta}>BETA</div>
            </div>
            <div className={styles.content}>
              <h1>World-building for the future</h1>
              <h3><i>Human-first, AI-assisted</i></h3>
              <p>Hear ye! Hear ye! A new era of creative writing has come upon us. With Genieous Creative Writing, with the help of AI has never been easier than before. The only limitations are your mind and will-power.</p>
            </div>
          </div>
          <div className={styles.bottom}>
            <div className={styles.login}> 
              <LoginInput />
              <LoginInput google={true} />
              <p>By creating an account in our website you agree the <Link href='/'>Terms and Conditions</Link> and have read our <Link href='/'>Privacy Policy</Link>.</p>
              <h4 className={styles.question}><i><u>Why should I even join?</u></i></h4>
            </div>
          </div>
        </section>
        {/* FEATURE #1 */}
        <section className={styles.feature} ref={templateFreeRef}>
          <div className={styles.top}>
            <div className={styles.header}>
              <div className={styles.brand}>
                <h4>Features</h4>
                <h5>Template-free</h5>
              </div>
            </div>
            <div className={styles.content}>
              <h1>Unopinionated, Template-free</h1>
              <h3><i>Your world, your rules</i></h3>
              <p>Build what you want, however you want. Without the constraints of a pre-made template somebody else decided for you. You can define any object of any type with any properties you like. Hooray for customization!</p>
            </div>
          </div>
          <div className={styles.bottom}>
            <div className={styles.content}>
              <h4>Go write your stuff! →</h4>
              <Button content='... or Generate an object' />
              <div className={styles.empty}></div>
              <h4 className={styles.question} ><i><u>Well, but what if I need templates?</u></i></h4>
            </div>
          </div>
        </section>
        {/* FEATURE #2 */}
        <section className={styles.feature} ref={aiAssistanceRef}>
        <div className={styles.top}>
            <div className={styles.header}>
              <div className={styles.brand}>
                <h4>Features</h4>
                <h5>AI-assistance</h5>
              </div>
            </div>
            <div className={styles.content}>
              <h1>AI at your service!</h1>
              <h3><i>Ask the AI to help you write</i></h3>
              <p>Without a template you may not exactly know where to start. But fret not! AI is here to assist. You can ask the Ai to generate an object type and its properties by pressing the button below. Then just fill-in the deets.</p>
            </div>
          </div>
          <div className={styles.bottom}>
            <div className={styles.content}>
              <Button content='... or Generate an object' />
              <p>The AI has generated an object with the type &apos;dragon&apos; with the properties &apos;color&apos; and &apos;species&apos;</p>
              <div className={styles.empty}></div>
              <h4 className={styles.question} ><i><u>But, I don&apos;t like these AI thingies</u></i></h4>
            </div>
          </div>
        </section>
        {/* FEATURE #3 */}
        <section className={styles.feature} ref={aiControlRef}>
        <div className={styles.top}>
            <div className={styles.header}>
              <div className={styles.brand}>
                <h4>Features</h4>
                <h5>AI-control</h5>
              </div>
            </div>
            <div className={styles.content}>
              <h1 className={styles.specialH1}>Don&apos;t want the AI hibbie jibbies?</h1>
              <h3><i>You can always opt-out</i></h3>
              <p>AI hasn&apos;t taken over the world yet. But just in case, you can turn off AI-assistance in the settings or by pressing the button below. The user is always at the driver seat, the and AI will not take action unless you want it to.</p>
            </div>
          </div>
          <div className={styles.bottom}>
            <div className={styles.content}>
              <Button content='Disable Ai-assistance' />
              <p>The AI assistance has been disabled. You can turn it back on by pressing the button above.</p>
              <div className={styles.empty}></div>
              <h4 className={styles.question} ><i><u>I want to see more features</u></i></h4>
            </div>
          </div>
        </section>
      </main>
      <aside>
        <div className={styles.object}>
          <h2>See for yourself</h2>
          <div className={styles.form}>
            <div className={styles.color}></div>
            <div className={styles.content}>
              <div className={styles.details}>
                <h5>Object details</h5>
                <input type="text" value={demoObject?.name} placeholder='Write the name of your object' />
                <input className={styles.uniqueInput} value={'a type of ' + demoObject?.type} type="text" placeholder='My object is a...' />
              </div>
              <h5>Properties</h5>
              <div className={styles.propertyGroup}>
                {
                  demoObject?.properties && Object.entries(demoObject?.properties).map(([key, value], index)=>(
                    <div key={index} className={styles.property}>
                      <input type="text" name="property-name" value={key}  placeholder='Property 1'/>
                      <input type="text" name="property-value" value={value} placeholder='Describe the property'/>
                    </div>
                  ))
                }
              </div>
              <div>
                <h5>Description</h5>
                <textarea 
                  value={demoObject?.description}
                  name="description" 
                  cols={30} rows={3} 
                  placeholder='Write the description for your world-building-object...'>
                </textarea>
              </div>
            </div>
          </div>
          <Button content='Generate an object' click={handleGenerateObject} />
        </div>
      </aside>
    </div>
  )
}
