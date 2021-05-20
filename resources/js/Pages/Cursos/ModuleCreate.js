import React, { useState } from 'react'
import { useEffect } from 'react'
import { Inertia } from '@inertiajs/inertia'
import Layout from '../../layouts/Layout';
import '../../styles/cursos.css'

const ModuleCreate = () => {
  return (
    <>
    
    <div className="row">                
        <div className="col s12">
            <div className="card ">
                <div className="card-content">
                    <form >
                        <div className="modal-content">
                            <div className="row">
                                aaa
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

ModuleCreate.layout = page => <Layout children={page} title="Agregar módulo" pageTitle="AGREGAR MÓDULO"/>

export default ModuleCreate