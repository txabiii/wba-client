'use client';

import styles from './page.module.scss'
import cx from 'classnames'

import Button from '@root/components/Button/component'
import DemoObject from '@root/components/DemoObject/component';

import Link from 'next/link'

import { useEffect, useRef, useState } from 'react';

import { enterEmail, login, signUp } from '@root/api/userClient'

interface DemoObjectRef {
  generateObjectFromParent: () => void;
}

export default function Home() {
  // Snap effect
  const heroRef = useRef<HTMLDivElement>(null);
  const templateFreeRef = useRef<HTMLDivElement>(null);
  const aiAssistanceRef = useRef<HTMLDivElement>(null);
  const aiControlRef = useRef<HTMLDivElement>(null);
  const moreFeaturesRef = useRef<HTMLDivElement>(null);

  useEffect(()=>{
    const debouncedSnapToClosest = debounce(snapToClosest, 200)

    window.addEventListener('scroll', debouncedSnapToClosest);

    return () => {
      window.removeEventListener('scroll', debouncedSnapToClosest)
    }
  }, [])

  function snapToClosest() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const viewportHeight = window.innerHeight;
    if (scrollTop >= viewportHeight*4) return;
 
    if(heroRef.current && templateFreeRef.current && aiAssistanceRef.current && aiControlRef.current && moreFeaturesRef.current) {
      const elements = [heroRef.current, templateFreeRef.current, aiAssistanceRef.current, aiControlRef.current, moreFeaturesRef.current]
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

  // For calling generateObject function in the child component
  const childRef = useRef<DemoObjectRef>(null);
  
  const handleClick = () => {
    if(childRef.current) {
      childRef.current.generateObjectFromParent();
    }
  };

  // Handling login in/sign up states
  const [loginInitialState, setLoginInitialState] = useState(true)
  const [isRegistered, setIsRegistered] = useState<Boolean | null>(null)

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const [newUserPassword, setNewUserPassword] = useState('')

  const loginMessageRef = useRef<HTMLParagraphElement>(null)

  const handleProceedClick = async () => {
    if(!email) return

    const emailRegex = /\S+@\S+\.\S+/;
    if(!emailRegex.test(email)) return

    const result = await enterEmail(email)

    if(result.status === '400') {
      setIsRegistered(true);
    } else {
      setIsRegistered(false)
    }
    setLoginInitialState(false);
  }

  const handleLoginClick = async () => {
    if(!email && !password) return

    const result = await login(email, password)
    console.log(result)

    if(result.status === '200') {
      console.log('logged in')
    } else {
      if(loginMessageRef.current) {
        loginMessageRef.current.innerHTML = 'Password did not match. Please try again.'
      }
    }
  }

  const handleConfirmPassword = async () => {
    if(!email && !newUserPassword) return

    const result = await  signUp(email, newUserPassword)
  }

  return(
    <div>
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
                {
                  loginInitialState && 
                  <>
                    <p className={styles.loginMessage}>Login or Sign up. Please enter your email</p>
                    <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Plase enter your email...'/>
                    <Button content='Proceed' click={handleProceedClick} />
                    <p className={styles.forget}><Link href='/'>Forgot your password?</Link></p>
                  </>
                }
                {
                  isRegistered && !loginInitialState && 
                  <>
                    <p ref={loginMessageRef} className={styles.loginMessage}>Account found! Please enter your password</p>
                    <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Plase enter your password'/>
                    <Button content='Login' click={handleLoginClick} />
                    <p 
                      className={styles.forget}
                      onClick={()=>{
                        setEmail('')
                        setPassword('')
                        setNewUserPassword('')
                        setLoginInitialState(true)
                        setIsRegistered(false)
                      }}
                    >Go back</p>
                  </>
                }
                {
                  !isRegistered && !loginInitialState && 
                  <>
                    <p className={styles.loginMessage}>No account found. Setup password for a new one.</p>
                    <input type="password" value={newUserPassword} onChange={(e)=>setNewUserPassword(e.target.value)} placeholder='Setup your password'/>
                    <Button content='Confirm password and Login' click={handleConfirmPassword} />
                    <p 
                      className={styles.forget}
                      onClick={()=>{
                        setEmail('')
                        setPassword('')
                        setNewUserPassword('')
                        setLoginInitialState(true)
                        setIsRegistered(false)
                      }}
                    >Go back</p>
                  </>
                }
              </div>
              <h4 
                className={styles.question}
                onClick={()=>{
                  if(templateFreeRef.current) {
                    templateFreeRef.current.scrollIntoView({ behavior: 'smooth'})
                  }
                }}
              ><i><u>Why should I even join?</u></i></h4>
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
                <Button content='... or Generate an object' click={handleClick} />
                <div className={styles.empty}></div>
                <h4 
                  className={styles.question}
                  onClick={()=>{
                    if(aiAssistanceRef.current) {
                      aiAssistanceRef.current.scrollIntoView({ behavior: 'smooth'})
                    }
                  }}
                ><i><u>Well, but what if I need templates?</u></i></h4>
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
                <p>Without a template you may not exactly know where to start. But fret not! AI is here to assist. You can ask the Ai to generate an object type and its properties by pressing the button below. Then just modify it or fill-in the details.</p>
              </div>
            </div>
            <div className={styles.bottom}>
              <div className={styles.content}>
                <Button content='Generate an object' click={handleClick}/>
                <p>Click the button above to generate a new world-building object. It will have a name, type, two properties and a brief description</p>
                <div className={styles.empty}></div>
                <h4 
                  className={styles.question}
                  onClick={()=>{
                    if(aiControlRef.current) {
                      aiControlRef.current.scrollIntoView({ behavior: 'smooth'})
                    }
                  }}
                ><i><u>But, I don&apos;t like these AI thingies</u></i></h4>
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
        <DemoObject ref={childRef}/>
        </aside>
      </div>
      <div ref={moreFeaturesRef} className={styles.moreFeatures}>
        <h2>More features</h2>
        <div className={styles.featuresWrapper}>
          <div className={styles.feature}>
            <h3>File organization system</h3>
            <p>A clean and simple file organization system that is intuitive to use. Organize your objects in folders so you can keep track of all your writings.</p>
            <div className={styles.imgWrapper}></div>
          </div>
          <div className={styles.feature}>
            <h3>Rich-text Editor</h3>
            <p>The key to a good writing space is a clean and simple user interface which our text editor workspace provides ensuring maximum productivity.</p>
            <div className={styles.imgWrapper}></div>
          </div>
          <div className={styles.feature}>
            <h3>Mentions and links</h3>
            <p>Keep track of your objects relationships and associations by a smart linking function so your objects can not only exist but co-exist with other objects in your world.</p>
            <div className={styles.imgWrapper}></div>
          </div>
        </div>
      </div>
      <div className={styles.last}>
        <div className={styles.content}>
          <h5>Quick <span>idea generation</span> using <span>AI</span>, boundless object <span>customization</span> for maximum <span>flexibility</span>, <span>easy to start</span> and <span>easy to scale</span> to however big you want your world to be, all these benefits and so much more </h5>
          <h2>Create your accout now, for free!</h2>
          <div className={styles.login}> 
            {
              loginInitialState && 
              <>
                <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Plase enter your email...'/>
                <Button content='Login/SignUp' click={handleProceedClick} />
                <p className={styles.forget}><Link href='/'>Forgot your password?</Link></p>
              </>
            }
            {
              isRegistered && !loginInitialState && 
              <>
                <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Plase enter your password'/>
                <Button content='Login' click={handleLoginClick} />
                <p 
                  className={styles.forget}
                  onClick={()=>{
                    setEmail('')
                    setPassword('')
                    setNewUserPassword('')
                    setLoginInitialState(true)
                    setIsRegistered(false)
                  }}
                >Go back</p>
              </>
            }
            {
              !isRegistered && !loginInitialState && 
              <>
                <input type="password" value={newUserPassword} onChange={(e)=>setNewUserPassword(e.target.value)} placeholder='Setup your password'/>
                <Button content='Confirm password and Login' click={handleConfirmPassword} />
                <p 
                  className={styles.forget}
                  onClick={()=>{
                    setEmail('')
                    setPassword('')
                    setNewUserPassword('')
                    setLoginInitialState(true)
                    setIsRegistered(false)
                  }}
                >Go back</p>
              </>
            }
          </div>
        </div>
      </div>
      <div className={styles.sampleFooter}></div>
    </div>
  )
}