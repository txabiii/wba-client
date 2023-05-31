'use client';

import styles from './page.module.scss'
import 'draft-js/dist/Draft.css';

import Footer from '@root/components/Footer/component';
import Button from '@root/components/Button/component';
import EditToolbar from '@root/components/EditToolbar/component';

import { useRouter } from "next/navigation"
import { useEffect, useState, ChangeEvent } from "react";

import { ContentBlock, Editor, EditorState } from 'draft-js';

import { logOut  as userClientLogOut, checkVerification } from "@root/api/userClient";

function myBlockStyleFn(contentBlock: ContentBlock): string {
  const type = contentBlock.getType();
  if (type === 'blockquote') {
    return styles.customBlockQuote;
  }
  return '';
}

const isSSR = typeof window === 'undefined'; 

interface Property {
  id: number;
  name: string;
  value: string;
}

interface Object {
  id: number;
  name: string;
  type: string;
  description: string;
  properties: Property[];
}

export default function Workspace() {
  // object state
  const [object, setObject] = useState<Object>()

  //sample property
  // const properties: Property[] = [
  //   {
  //     id: 1,
  //     name: 'blah',
  //     value: 'blub'
  //   }
  // ];

  const [properties, setProperties] = useState<Property[]>(
    [
      {
        id: 1,
        name: 'blah',
        value: 'blub'
      }
    ]
  );

  const [content, setContent] = useState('');

  const handleInput = (event: ChangeEvent<HTMLDivElement>) => {
    const { textContent } = event.target;
    setContent(textContent || '');
  };

  const router = useRouter()

  const logOut = () => {
    userClientLogOut()
    router.push('/')
  }

  useEffect(()=>{
    async function verify() { 
      const result = await checkVerification()
      if(result){
        if(result.status !== 200) {
          router.push('/verification')
        }
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
              <EditToolbar editorState={editorState} setEditorState={setEditorState} />
            </div>
          </nav>
          <section className={styles.workArea}>
            <div className={styles.document}>
              <h5>Object details</h5>
              <input type="text" className={styles.name} placeholder='Write name of object' />
              <input type="text" className={styles.type} placeholder='Write type of object'/>
              <Editor 
                editorState={editorState} 
                onChange={setEditorState}
                placeholder='Write the description of your object'
                blockStyleFn={myBlockStyleFn}
              />
            </div>
            <aside className={styles.propertiesSidebar}>
              <div className={styles.color}></div>
              <div className={styles.properties}>
                <h5>Properties</h5>
                <div className={styles.property}>
                  <input type="text" />
                  <div
                    contentEditable="true"
                    className={styles.propertyValue}
                    onInput={handleInput}
                  >
                  </div>
                </div>
              </div>
            </aside>
          </section>
        </main>
      </div>
      <Footer/>
      </>}
    </>
  )
}