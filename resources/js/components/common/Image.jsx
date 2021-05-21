import React, { useState } from 'react';
import Skeleton from 'react-loading-skeleton';
 
export default function Image({ image, type, rounded, clase, estilo, identificador, width, height, claseSkeleton }){
  const [state, setState] = useState({
      loaded: false
  })

  return(
      <>
      {
        <>
            {!state.loaded && <Skeleton circle={rounded ?? false} height={height ?? 50} width={width ?? 50} className={claseSkeleton ?? null}/>}

            <img 
                src=
                {type == "perfil" ?
                    "/storage/fotos_perfil/"+image
                    :
                    "/storage/imagenes_curso/"+image
                }

                id={identificador ?? null}

                className={clase ?? null}

                style={state.loaded ? estilo ?? {} : {display: "none"}}

                onLoad={() => setState({loaded: true})} 
            />
        </>
      }
      </>
  )
}