'use client';

import styles from './page.module.scss'
import 'draft-js/dist/Draft.css';

import Footer from '@root/components/Footer/component';
import Button from '@root/components/Button/component';

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react";

import { Editor, EditorState } from 'draft-js';

import { logOut  as userClientLogOut, checkVerification } from "@root/api/userClient";

const isSSR = typeof window === 'undefined'; 

export default function Workspace() {
  const router = useRouter()

  const logOut = () => {
    userClientLogOut()
    router.push('/')
  }

  useEffect(()=>{
    async function verify() { 
      const result = await checkVerification()
      if(result.status !== 200) {
        router.push('/verification')
      }
    }
    verify()
  }, [router])

  // editor
  const [editorState, setEditorState] = useState(
    EditorState.createEmpty()
  );

  return (
    <>    
      { !isSSR && <>
      <div className={styles.workspace}>
        <div className={styles.files}></div>
        <main>
          <nav>
            <div className={styles.options}>
              <Button content='save' click={()=>{}} />
              <h6>Edit</h6>
              <h6>AI Tools</h6>
              <h6>Node Map</h6>
              <h6>Export</h6>
              <div className={styles.empty}></div>
              <Button content='Log out' click={logOut} />
            </div>
            <div className={styles.tools}>

            </div>
          </nav>
          <section className={styles.workArea}>
            <div className={styles.document}>
              <h5>Object details</h5>
              <Editor 
                editorState={editorState} 
                onChange={setEditorState} 
                placeholder='Write the description of your object'
              />
            </div>
            <aside className={styles.properties}>

            </aside>
          </section>
        </main>
      </div>
      <Footer/>
      </>}
    </>
  )
}