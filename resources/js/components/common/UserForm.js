import React, { useEffect, useState } from 'react'
import { usePage } from '@inertiajs/inertia-react'
import { Inertia } from '@inertiajs/inertia'
import '/css/infoAlumno.css'
import { divide } from 'lodash'
import ModalEliminarUsuario from '../../components/common/ModalEliminarUsuario';

//este componente muestra el formulario para editar usuario o crear uno nuevo

//user es el usuario recibido, si no tiene usuario entonces se muestra el formulario para agregar usuario
//onEditChange sirve para poder modificar el state de edit en el componente padre
//bEdit recibe el state de edit del componente padre
export default function InfoAlumno({user, onEditChange, bEdit, categories, regimes, units}) {
    //errores de la validacion de laravel
    const { errors } = usePage().props

    //actualiza los hooks cada vez que se modifica un input
    function handleChange(e) {
        const key = e.target.id;
        const value = e.target.value
        setValues(values => ({
            ...values,
            [key]: value,
        }))

        if(key == "regime")
        {
            Inertia.reload({only: ['units'], data: {regime: value}})
        }
    }

    //este metodo se ejecuta cuando se manda el formulario de crear nuevo usuario
    function handleCreate(e) {
        e.preventDefault()
        Inertia.post(route('usuarios.create'), values, { 
            onSuccess: errors=>{console.log("errors")},
            onError: errors=>{console.log(errors)}
        })
    }

    //este metodo se ejecuta cuando se manda el formulario de editar usuario
    function handleEdit(e) {
        if(user){
            let user_id = user.id
            e.preventDefault()
            Inertia.visit(route('usuarios.edit', user.id), 
            { 
                preserveState: true,
                method: 'post', 
                data: values, 
                onError: error => {
                    Inertia.reload({only: ['user','categories','regimes','units'], data: { user: user.id }})
                    setValues(...values)
                } 
            })
        }
    }

    //valores para formulario
    const [values, setValues] = useState({
    nombre: "",
    apellido_paterno: "",
        apellido_m: "",
        email: "",
        fecha_nac: "",
        sexo: "",
        matricula: "",
        categorie: "",
        unit: "",
        regime: "",
        estado: "",
        ciudad: "",
        colonia: "",
        calle: "",
        cp: "",
        num_ext: "",
        num_int: "",
        tarjeton_pago: "",
        created_at: "",
        foto: "",
    })

    function initializeSelects() {
        var elems = document.querySelectorAll('select');
        var instances = M.FormSelect.init(elems);
        var elems = document.querySelectorAll('.autocomplete');
        var instances = M.Autocomplete.init(elems);
        var elems = document.querySelectorAll('.modal');
        var instances = M.Modal.init(elems);
    }

    function parseFecha(date){
        var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;

        return [year, month, day].join('-');
    }

    // Estos dos métodos detectan el click y al suceder ejecutan el click en el input vacío
    function clickFoto(){
        document.getElementById("imageUpload").click();
    }

    function changeFoto(){
        var inputFotos = document.getElementById('imageUpload');
        if ( inputFotos.files && inputFotos.files[0] ){
            document.getElementById("profileImage").src = window.URL.createObjectURL(inputFotos.files[0]);
        }
        
    }

    //Este metodo se ejecuta cuando se presiona el boton de editar usuario
    function editUser(){
        onEditChange(true)
        var elems = document.querySelectorAll('select');
        var instances = M.FormSelect.init(elems);
    }
    
    //setea la const values con los valores del usuario, si el usuario es nulo los valores tambien
    function setUserValues(){
        setValues({
            nombre: user == null ? "" : user.nombre,
            apellido_paterno: user == null ? "" : user.apellido_p,
            apellido_m: user == null ? "" : user.apellido_m,
            email: user == null ? "" : user.email,
            fecha_nac: user == null ? "" : user.fecha_nac,
            sexo: user == null ? "" : user.sexo,
            matricula: user == null ? "" : user.matricula,
            categorie: user == null ? "" : user.categorie != null ? user.categorie.nombre : "",
            unit: user == null ? "" : user.unit != null ? user.unit.nombre : "",
            regime: user == null ? "" : user.unit != null ? user.unit.regime != null ? user.unit.regime.nombre : "" : "",
            estado: user == null ? "" : user.estado,
            ciudad: user == null ? "" : user.ciudad,
            colonia: user == null ? "" : user.colonia,
            calle: user == null ? "" : user.calle,
            cp: user == null ? "" : user.cp,
            num_ext: user == null ? "" : user.num_ext,
            num_int: user == null ? "" : user.num_int,
            tarjeton_pago: user == null ? "" : user.tarjeton_pago,
            created_at: user == null ? "" : parseFecha(user.created_at),
            foto: user == null ? "" : user.foto,
        })
    }

    //este metodo se ejecuta cuando se presiona el boton de cancelar para editar usuario
    function cancelEditUser(){
        setUserValues()
        onEditChange(false)
        var elems = document.querySelectorAll('select');
        var instances = M.FormSelect.init(elems);
    }


    //se ejecuta cuando el componente se crea
    useEffect(() => {
        initializeSelects();
    }, [])
    
    //se ejecuta cada vez que el valor del user cambia
    useEffect(() => {
        setUserValues()
    }, [user])

    //se ejecuta cada vez que el valor de regimes cambia
    //sirve para inicializar los selects
    useEffect(() => {
        var elems = document.querySelectorAll('select');
        var instances = M.FormSelect.init(elems);
    }, [regimes])

    //se ejecuta cada vez que el valor del values cambia
    useEffect(() => {
        //actualiza los textfields para que no se amontonen los labels
        M.updateTextFields();
        var elems = document.querySelectorAll('select');
        var instances = M.FormSelect.init(elems);
    }, [values])

    useEffect(() => {
        //actualiza los textfields para que no se amontonen los labels
        var elems = document.querySelectorAll('select');
        var instances = M.FormSelect.init(elems);
    }, [bEdit])

    return(
        <form onSubmit={user ? handleEdit : handleCreate}>
            <div className="row div-form-register" style={{"padding":"3%"}}>
                <div className="col s12 m6 div-division user-form-border">
                    <p className="titles-sub" style={{"marginLeft":"3%"}}>INFORMACIÓN PERSONAL</p>

                    <div className="col s12" style={{"display": "flex","justifyContent":"center", "flexDirection":"column","marginTop":"5px","marginBottom":"5px"}}>
                        <img id="profileImage" onClick={() => {clickFoto()}} src={bEdit ? values.foto : user == null ? "" : user.foto ? "/storage/fotos_perfil/"+user.foto : "/storage/fotos_perfil/avatar1.png"} ></img>
                        <p id="txt-profile" style={{"cursor":"pointer"}} onClick={() => {clickFoto()}}>Foto de perfil</p>
                    </div>

                    <input id="imageUpload" type="file" className={errors.foto ? "validate form-control invalid" : "validate form-control"}
                        name="foto" placeholder="Photo" accept="image/png, image/jpeg, image/jpg, image/gif" onChange={() => {changeFoto()}}></input>
                        {
                            errors.foto && 
                            <span className="helper-text" data-error={errors.foto} style={{"marginBottom":"10px"}}>{errors.foto}</span>
                        }

                    <div className="input-field col s12">
                        <input  disabled={bEdit ? false : user ? true : false} id="nombre" type="text" className={errors.nombre ? "validate form-control invalid" : "validate form-control"} name="nombre" required autoComplete="nombre" value={values.nombre} onChange={handleChange} autoFocus/>
                        <label htmlFor="nombre">Nombre</label>
                        {
                            errors.nombre && 
                            <span className="helper-text" data-error={errors.nombre} style={{"marginBottom":"10px"}}>{errors.nombre}</span>
                        }
                    </div>

                    <div className="input-field col s12 input-50-re">
                        <input disabled={bEdit ? false : user ? true : false} id="apellido_paterno" type="text" className={errors.apellido_paterno ? "validate form-control invalid" : "validate form-control"}  name="apellido_paterno" value={values.apellido_paterno} onChange={handleChange} required autoComplete="apellido_paterno"/>
                        <label htmlFor="apellido_paterno">Apellido Paterno</label>
                        {
                            errors.apellido_paterno && 
                            <span className="helper-text" data-error={errors.apellido_paterno} style={{"marginBottom":"10px"}}>{errors.apellido_paterno}</span>
                        }
                        
                    </div>

                    <div className="input-field col s12 input-50-re">
                        <input  disabled={bEdit ? false : user ? true : false} id="apellido_m" type="text" className={errors.apellido_m ? "validate form-control invalid" : "validate form-control"} name="apellido_m" value={values.apellido_m} onChange={handleChange} autoComplete="apellido_materno"/>
                        <label htmlFor="apellido_materno">Apellido Materno</label>
                        {
                            errors.apellido_m && 
                            <span className="helper-text" data-error={errors.apellido_m} style={{"marginBottom":"10px"}}>{errors.apellido_m}</span>
                        }
                    </div>

                    <div className="input-field col s12 input-50-re">
                        <input disabled={bEdit ? false : user ? true : false} id="fecha_nac" max="2004-01-01" type="date" name="fecha_nac" required autoComplete="fecha_nacimiento" value={values.fecha_nac} onChange={handleChange} />
                        <label htmlFor="fecha_nacimiento">Fecha de Nacimiento</label>
                        {
                            errors.fecha_nac && 
                            <span className="helper-text" data-error={errors.fecha_nac} style={{"marginBottom":"10px"}}>{errors.fecha_nac}</span>
                        }
                    </div>

                    <div className="input-field col s12 input-50-re">
                        <select disabled={bEdit ? false : user ? true : false} id="sexo" name="sexo" required autoComplete="sexo" value={values.sexo} onChange={handleChange} className="input-field">
                            <option value="" disabled>Selecciona una opción</option>
                            <option value="m">Femenino</option>
                            <option value="h">Masculino</option>
                            <option value="o">Otro</option>
                        </select>
                        <label>Sexo</label>
                        {
                            errors.sexo && 
                            <span className="helper-text" data-error={errors.sexo} style={{"marginBottom":"10px"}}>{errors.sexo}</span>
                        }
                    </div>

                    <p className="titles-sub" style={{"marginLeft":"3%"}}>INFORMACIÓN INSTITUCIONAL</p>

                    <div className="input-field col s12">
                        <input  disabled={bEdit ? false : user ? true : false} id="matricula" type="text" className={errors.matricula ? "validate form-control invalid" : "validate"} name="matricula" value={values.matricula} onChange={handleChange} required autoComplete="matricula"/>
                        <label htmlFor="matricula">Matrícula</label>
                        {
                            errors.matricula && 
                            <span className="helper-text" data-error={errors.matricula} style={{"marginBottom":"10px"}}>{errors.matricula}</span>
                        }
                    </div>

                    <div className="input-field col s12">
                        <select disabled={bEdit ? false : user ? true : false} id="regime" name="regime" value={values.regime} onChange={handleChange}>
                            <option value="" disabled>Selecciona una opción</option>
                            {regimes && regimes.length > 0 && 
                                regimes.map(regime => (
                                    <option key={regime.nombre} value={regime.nombre}>{regime.nombre}</option>
                                ))
                            }
                        </select>
                        <label>Regimen</label>
                        {
                            errors.regime && 
                            <span className="helper-text" data-error={errors.regime} style={{"marginBottom":"10px"}}>{errors.regime}</span>
                        }
                    </div>

                    <div className="col s12" style={{"marginTop":"5px"}}>
                        <div className="input-field select-wrapper">
                            <input placeholder="Selecciona una unidad" disabled={bEdit ? false : user ? true : false} id="unit" list="unidades" type="text" className="validate" value={values.unit} onChange={handleChange}/>
                            <label htmlFor="unit">Unidad</label>
                            <svg className="caret" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"></path><path d="M0 0h24v24H0z" fill="none"></path></svg>
                        </div>
                        <datalist id="unidades">
                            {
                                units && units.length > 0 &&
                                 units.map(units => (
                                    <option key={units.nombre} value={units.nombre}/>
                                ))
                            }
                        </datalist>
                        {
                            errors.unit && 
                            <span className="helper-text" data-error={errors.unit} style={{"marginBottom":"10px"}}>{errors.unit}</span>
                        }
                    </div>

                    <div className="col s12">
                        <div className="input-field select-wrapper">
                            <input placeholder="Selecciona una categoría" disabled={bEdit ? false : user ? true : false} id="categorie" list="categorias" type="text" className="validate" value={values.categorie} onChange={handleChange}/>
                            <svg className="caret" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"></path><path d="M0 0h24v24H0z" fill="none"></path></svg>
                            <label htmlFor="categorie">Categoría</label>
                        </div>
                        <datalist id="categorias">
                            {
                                categories && categories.length > 0 &&
                                categories.map(category => (
                                    <option key={category.nombre} value={category.nombre}/>
                                ))
                            }
                        </datalist>
                        {/* <input disabled={bEdit ? false : user ? true : false} type="text" id="categoria" name="categoria" required autoComplete="categoria" className="autocomplete" value={values.categoria} onChange={handleChange}/>
                        <label htmlFor="autocomplete-input">Categoría</label> */}
                        {
                            errors.categoria && 
                            <span className="helper-text" data-error={errors.categoria} style={{"marginBottom":"10px"}}>{errors.categoria}</span>
                        }
                    </div>

                    <p style={{"marginTop":"0px", "fontFamily":"Montserrat" ,"fontSize":"13px"}}>Tarjetón de pago <a target="_blank" href={user == null || user.tarjeton_pago == null ? null : "/storage/tarjetones_pago/"+user.tarjeton_pago}>{user != null && user.tarjeton_pago}</a><i style={{"color":"#7E7E7E"}} className="material-icons tiny">description</i></p>
                </div>
                <div className="col s12 m6 div-division">
                    <p className="titles-sub" style={{"marginLeft":"3%"}}>DIRECCIÓN</p>

                    <div className="input-field col s6 ">
                        <input disabled={bEdit ? false : user ? true : false} id="estado" type="text" className={errors.estado ? "validate form-control invalid" : "validate"} name="estado"  value={values.estado} required autoComplete="estado" onChange={handleChange}/>
                        <label htmlFor="estado">Estado</label>
                        {
                            errors.estado && 
                            <span className="helper-text" data-error={errors.estado} style={{"marginBottom":"10px"}}>{errors.estado}</span>
                        }
                    </div>

                    <div className="input-field col s6 input-50-re">
                        <input disabled={bEdit ? false : user ? true : false} id="ciudad" type="text" className={errors.ciudad ? "validate form-control invalid" : "validate"} name="ciudad" value={values.ciudad} required autoComplete="ciudad" onChange={handleChange}/>
                        <label htmlFor="ciudad">Ciudad</label>
                        {
                            errors.ciudad && 
                            <span className="helper-text" data-error={errors.ciudad} style={{"marginBottom":"10px"}}>{errors.ciudad}</span>
                        }
                    </div>

                    <div className="input-field col s12 input-50-re">
                        <input disabled={bEdit ? false : user ? true : false} id="colonia" type="text" className={errors.colonia ? "validate form-control invalid" : "validate"} name="colonia" value={values.colonia} required autoComplete="colonia" onChange={handleChange}/>
                        <label htmlFor="colonia">Colonia</label>
                        {
                            errors.colonia && 
                            <span className="helper-text" data-error={errors.colonia} style={{"marginBottom":"10px"}}>{errors.colonia}</span>
                        }
                    </div>

                    <div className="input-field col s12 input-50-re">
                        <input  disabled={bEdit ? false : user ? true : false} id="calle" type="text" className={errors.calle ? "validate form-control invalid" : "validate"} name="calle" value={values.calle} required autoComplete="calle" onChange={handleChange}/>
                        <label htmlFor="calle">Calle</label>
                        {
                            errors.calle && 
                            <span className="helper-text" data-error={errors.calle} style={{"marginBottom":"10px"}}>{errors.calle}</span>
                        }
                    </div>

                    <div className="input-field col s6 input-50-re">
                        <input disabled={bEdit ? false : user ? true : false} id="cp" min="0" step="1" type="number"  className={errors.cp ? "validate form-control invalid" : "validate"} name="cp" value={values.cp} required autoComplete="cp" onChange={handleChange}/>
                        <label htmlFor="cp">Código Postal</label>
                        {
                            errors.cp && 
                            <span className="helper-text" data-error={errors.cp} style={{"marginBottom":"10px"}}>{errors.cp}</span>
                        }
                    </div>

                    <div className="input-field col s6 input-50-re">
                        <input disabled={bEdit ? false : user ? true : false} id="num_ext" min="0" step="1" type="number" className={errors.num_ext ? "validate form-control invalid" : "validate"} name="num_ext" value={values.num_ext} required autoComplete="num_ext" onChange={handleChange}/>
                        <label htmlFor="num_ext">No. Exterior</label>
                        {
                            errors.num_ext && 
                            <span className="helper-text" data-error={errors.num_ext} style={{"marginBottom":"10px"}}>{errors.num_ext}</span>
                        }
                    </div>

                    <div className="input-field col s6 input-50-re">
                        <input disabled={bEdit ? false : user ? true : false} id="num_int" min="0" step="1" type="number" className={errors.num_int ? "validate form-control invalid" : "validate"} name="num_int" value={values.num_int}  autoComplete="num_int" onChange={handleChange}/>
                        <label htmlFor="num_int">No. Interior</label>
                        {
                            errors.num_int && 
                            <span className="helper-text" data-error={errors.num_int} style={{"marginBottom":"10px"}}>{errors.num_int}</span>
                        }
                    </div>

                    <p className="titles-sub" style={{"marginLeft":"3%"}}>CUENTA</p>

                    <div className="input-field col s12">
                        <input disabled={bEdit ? false : user ? true : false} id="email" type="email" className={errors.email ? "validate form-control invalid" : "validate form-control"}  name="email" value={values.email} required autoComplete="email" onChange={handleChange}/>
                        <label htmlFor="email">Correo electrónico</label>
                        {
                            errors.email && 
                            <span className="helper-text" data-error={errors.email} style={{"marginBottom":"10px"}}>{errors.email}</span>
                        }
                    </div>

                    <div className="input-field col s12 input-50-re">
                        <input disabled={true} id="created_at" max="2004-01-01" type="date" name="created_at" required autoComplete="created_at" value={values.created_at} onChange={handleChange}/>
                        <label htmlFor="created_at">Fecha de Registro</label>
                        {
                            errors.created_at && 
                            <span className="helper-text" data-error={errors.created_at} style={{"marginBottom":"10px"}}>{errors.created_at}</span>
                        }
                    </div>
                </div>
            </div>
                {user ?
                    bEdit ?
                    <div className="row">
                        <button type="button" className="col s3 m2 center-align offset-s6 offset-m8 btn waves-effect waves-light" onClick={cancelEditUser}>Cancelar</button>
                        <button type="submit" className="col s3 m2 center-align btn waves-effect waves-light">
                            Guardar
                            <i className="material-icons right">send</i>
                        </button>
                    </div> 
                    : 
                    <div className="row">
                        <button type="button" className="col s3 m2 center-align offset-s6 offset-m8" style={{"border":"none","backgroundColor":"transparent","color":"#515B60"}} onClick={editUser}><i className="material-icons">edit</i></button>
                        <button data-target="modalEliminarUsuario" type="button" className="col s3 m2 center-align modal-trigger" style={{"border":"none","backgroundColor":"transparent","color":"#515B60","cursor":"pointer"}}><i className="material-icons">delete</i></button>
                    </div>
                :
                <div className="row">
                    <button type="submit" className="col s3 m2 center-align btn waves-effect waves-light">
                        Guardar
                        <i className="material-icons right">send</i>
                    </button>
                </div> 
                }
        </form> 
    ) 

}
