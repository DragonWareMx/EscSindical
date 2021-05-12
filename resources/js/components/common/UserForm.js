import React, { useEffect, useState } from 'react'
import { usePage } from '@inertiajs/inertia-react'
import { Inertia } from '@inertiajs/inertia'
import '/css/infoAlumno.css'

export default function InfoAlumno({user, onEditChange, bEdit}) {
    const { errors } = usePage().props

    function handleChange(e) {
        const key = e.target.id;
        const value = e.target.value
        setValues(values => ({
            ...values,
            [key]: value,
        }))
    }

    function handleSubmit(e) {
        if(user){
            e.preventDefault()
            Inertia.post(route('usuarios.edit', user.id), values)
        }
    }

    //valores para formulario
    const [values, setValues] = useState({
        nombre: "",
        apellido_p: "",
        apellido_m: "",
        email: "",
        fecha_nac: "",
        sexo: "",
        matricula: "",
        regime_id: "",
        unity_id: "",
        categorie: "",
        estado: "",
        ciudad: "",
        colonia: "",
        calle: "",
        cp: "",
        num_ext: "",
        num_int: "",
        email: "",
        created_at: "",
        foto: "",
    })

    function initializeSelects() {
        var elems = document.querySelectorAll('select');
        var instances = M.FormSelect.init(elems);
        var elems = document.querySelectorAll('.autocomplete');
        var instances = M.Autocomplete.init(elems);
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

    function editUser(){
        onEditChange(true)
    }

    function cancelEditUser(){
        onEditChange(false)
    }

    useEffect(() => {
        initializeSelects();
    }, [])

    return(
        <form onSubmit={handleSubmit}>
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
                        <input  disabled id="nombre" type="text" className={errors.nombre ? "validate form-control invalid" : "validate form-control"} name="nombre" required autoComplete="nombre" value={bEdit ? values.nombre : user == null ? null : user.nombre} onChange={handleChange} autoFocus/>
                        <label htmlFor="nombre">Nombre</label>
                        {
                            errors.nombre && 
                            <span className="helper-text" data-error={errors.nombre} style={{"marginBottom":"10px"}}>{errors.nombre}</span>
                        }
                    </div>

                    <div className="input-field col s12 input-50-re">
                        <input disabled id="apellido_p" type="text" className={errors.apellido_p ? "validate form-control invalid" : "validate form-control"}  name="apellido_p" value={bEdit ? values.apellido_p : user == null ? null : user.apellido_p} required autoComplete="apellido_paterno"/>
                        <label htmlFor="apellido_paterno">Apellido Paterno</label>
                        {
                            errors.apellido_p && 
                            <span className="helper-text" data-error={errors.apellido_p} style={{"marginBottom":"10px"}}>{errors.apellido_p}</span>
                        }
                        
                    </div>

                    <div className="input-field col s12 input-50-re">
                        <input  disabled id="apellido_m" type="text" className={errors.apellido_m ? "validate form-control invalid" : "validate form-control"} name="apellido_m" value={bEdit ? values.apellido_m : user == null ? null : user.apellido_m} autoComplete="apellido_materno"/>
                        <label htmlFor="apellido_materno">Apellido Materno</label>
                        {
                            errors.apellido_m && 
                            <span className="helper-text" data-error={errors.apellido_m} style={{"marginBottom":"10px"}}>{errors.apellido_m}</span>
                        }
                    </div>

                    <div className="input-field col s12 input-50-re">
                        <input disabled id="fecha_nac" max="2004-01-01" type="date" name="fecha_nac" required autoComplete="fecha_nacimiento" value={bEdit ? values.fecha_nac : user == null ? null : user.fecha_nac} />
                        <label htmlFor="fecha_nacimiento">Fecha de Nacimiento</label>
                        {
                            errors.fecha_nac && 
                            <span className="helper-text" data-error={errors.fecha_nac} style={{"marginBottom":"10px"}}>{errors.fecha_nac}</span>
                        }
                    </div>

                    <div className="input-field col s12 input-50-re">
                        <select disabled id="sexo" name="sexo" required autoComplete="sexo" defaultValue={bEdit ? values.sexo : user == null ? null : user.sexo} onChange={handleChange}>
                            <option value="Femenino">Femenino</option>
                            <option value="Masculino">Masculino</option>
                        </select>
                        <label>Sexo</label>
                        {
                            errors.sexo && 
                            <span className="helper-text" data-error={errors.sexo} style={{"marginBottom":"10px"}}>{errors.sexo}</span>
                        }
                    </div>

                    <p className="titles-sub" style={{"marginLeft":"3%"}}>INFORMACIÓN INSTITUCIONAL</p>

                    <div className="input-field col s12">
                        <input  disabled id="matricula" type="text" className={errors.matricula ? "validate form-control invalid" : "validate"} name="matricula" value={bEdit ? values.matricula : user == null ? null : user.matricula} required autoComplete="matricula"/>
                        <label htmlFor="matricula">Matrícula</label>
                        {
                            errors.matricula && 
                            <span className="helper-text" data-error={errors.matricula} style={{"marginBottom":"10px"}}>{errors.matricula}</span>
                        }
                    </div>

                    <div className="input-field col s12">
                        <select disabled id="regime_id" name="regime_id" required autoComplete="regime_id" value={bEdit ? values.regime_id : user == null ? null : user.regime_id}>
                            <option value="" disabled >Selecciona una opción</option>
                            <option value="1">Ordinario</option>
                            <option value="2">Bienestar</option>
                        </select>
                        <label>Regimen</label>
                        {
                            errors.regime_id && 
                            <span className="helper-text" data-error={errors.regime_id} style={{"marginBottom":"10px"}}>{errors.regime_id}</span>
                        }
                    </div>

                    <div className="input-field col s12" style={{"marginTop":"5px"}}>
                        <select disabled id="unity_id" name="unity_id" required autoComplete="unity_id" value={bEdit ? values.unity_id : user == null ? null : user.unity_id}>
                            <option value="" disabled>Selecciona una opción</option>
                            <option value="1">UMF 75 - Morelia c/UMAA</option>
                            <option value="2">UMF 80 - Morelia</option>
                        </select>
                        <label>Unidad</label>
                        {
                            errors.unity_id && 
                            <span className="helper-text" data-error={errors.unity_id} style={{"marginBottom":"10px"}}>{errors.unity_id}</span>
                        }
                    </div>

                    <div className="input-field col s12">
                        <input disabled type="text" id="categoria" name="categoria" required autoComplete="categoria" className="autocomplete" value={bEdit ? values.categoria : user == null ? null : user.categorie.nombre}/>
                        <label htmlFor="autocomplete-input">Categoría</label>
                        {
                            errors.categoria && 
                            <span className="helper-text" data-error={errors.categoria} style={{"marginBottom":"10px"}}>{errors.categoria}</span>
                        }
                    </div>

                    <p style={{"marginTop":"0px", "fontFamily":"Montserrat" ,"fontSize":"13px"}}>Tarjetón de pago <a target="_blank" href={user == null || user.tarjeton_pago == null ? null : "/storage/tarjetones_pago/"+user.tarjeton_pago}>{user == null ? null : user.tarjeton_pago}</a><i style={{"color":"#7E7E7E"}} className="material-icons tiny">description</i></p>
                </div>
                <div className="col s12 m6 div-division">
                    <p className="titles-sub" style={{"marginLeft":"3%"}}>DIRECCIÓN</p>

                    <div className="input-field col s6 ">
                        <input disabled id="estado" type="text" className={errors.estado ? "validate form-control invalid" : "validate"} name="estado"  value={bEdit ? values.estado : user == null ? null : user.estado} required autoComplete="estado"/>
                        <label htmlFor="estado">Estado</label>
                        {
                            errors.estado && 
                            <span className="helper-text" data-error={errors.estado} style={{"marginBottom":"10px"}}>{errors.estado}</span>
                        }
                    </div>

                    <div className="input-field col s6 input-50-re">
                        <input disabled id="ciudad" type="text" className={errors.ciudad ? "validate form-control invalid" : "validate"} name="ciudad" value={bEdit ? values.ciudad : user == null ? null : user.ciudad} required autoComplete="ciudad"/>
                        <label htmlFor="ciudad">Ciudad</label>
                        {
                            errors.ciudad && 
                            <span className="helper-text" data-error={errors.ciudad} style={{"marginBottom":"10px"}}>{errors.ciudad}</span>
                        }
                    </div>

                    <div className="input-field col s12 input-50-re">
                        <input disabled id="colonia" type="text" className={errors.colonia ? "validate form-control invalid" : "validate"} name="colonia" value={bEdit ? values.colonia : user == null ? null : user.colonia} required autoComplete="colonia"/>
                        <label htmlFor="colonia">Colonia</label>
                        {
                            errors.colonia && 
                            <span className="helper-text" data-error={errors.colonia} style={{"marginBottom":"10px"}}>{errors.colonia}</span>
                        }
                    </div>

                    <div className="input-field col s12 input-50-re">
                        <input  disabled id="calle" type="text" className={errors.calle ? "validate form-control invalid" : "validate"} name="calle" value={bEdit ? values.calle : user == null ? null : user.calle} required autoComplete="calle"/>
                        <label htmlFor="calle">Calle</label>
                        {
                            errors.calle && 
                            <span className="helper-text" data-error={errors.calle} style={{"marginBottom":"10px"}}>{errors.calle}</span>
                        }
                    </div>

                    <div className="input-field col s6 input-50-re">
                        <input disabled id="cp" min="0" step="1" type="number"  className={errors.cp ? "validate form-control invalid" : "validate"} name="cp" value={bEdit ? values.cp : user == null ? null : user.cp} required autoComplete="cp"/>
                        <label htmlFor="cp">Código Postal</label>
                        {
                            errors.cp && 
                            <span className="helper-text" data-error={errors.cp} style={{"marginBottom":"10px"}}>{errors.cp}</span>
                        }
                    </div>

                    <div className="input-field col s6 input-50-re">
                        <input disabled id="num_ext" min="0" step="1" type="number" className={errors.num_ext ? "validate form-control invalid" : "validate"} name="num_ext" value={bEdit ? values.num_ext : user == null ? null : user.num_ext} required autoComplete="num_ext"/>
                        <label htmlFor="num_ext">No. Exterior</label>
                        {
                            errors.num_ext && 
                            <span className="helper-text" data-error={errors.num_ext} style={{"marginBottom":"10px"}}>{errors.num_ext}</span>
                        }
                    </div>

                    <div className="input-field col s6 input-50-re">
                        <input disabled id="num_int" min="0" step="1" type="number" className={errors.num_int ? "validate form-control invalid" : "validate"} name="num_int" value={bEdit ? values.num_int : user == null ? null : user.num_int}  autoComplete="num_int"/>
                        <label htmlFor="num_int">No. Interior</label>
                        {
                            errors.num_int && 
                            <span className="helper-text" data-error={errors.num_int} style={{"marginBottom":"10px"}}>{errors.num_int}</span>
                        }
                    </div>

                    <p className="titles-sub" style={{"marginLeft":"3%"}}>CUENTA</p>

                    <div className="input-field col s12">
                        <input disabled id="email" type="email" className={errors.email ? "validate form-control invalid" : "validate form-control"}  name="email" value={bEdit ? values.email : user == null ? null : user.email} required autoComplete="email"/>
                        <label htmlFor="email">Correo electrónico</label>
                        {
                            errors.email && 
                            <span className="helper-text" data-error={errors.email} style={{"marginBottom":"10px"}}>{errors.email}</span>
                        }
                    </div>

                    <div className="input-field col s12 input-50-re">
                        <input disabled id="created_at" max="2004-01-01" type="date" name="created_at" required autoComplete="created_at" value={bEdit ? values.created_at : user == null ? null : user.created_at ? parseFecha(user.created_at) : null} />
                        <label htmlFor="created_at">Fecha de Registro</label>
                        {
                            errors.created_at && 
                            <span className="helper-text" data-error={errors.created_at} style={{"marginBottom":"10px"}}>{errors.created_at}</span>
                        }
                    </div>
                        {bEdit ?
                        <div className="row">
                            <button type="button" className="col s3 m2 center-align offset-s6 offset-m8" style={{"border":"none","backgroundColor":"transparent","color":"#515B60"}} onClick={cancelEditUser}>Cancelar</button>
                            <button type="button" className="col s3 m2 center-align" style={{"border":"none","backgroundColor":"transparent","color":"#515B60"}}>Guardar</button>
                        </div> 
                        : 
                        <div className="row">
                            <button type="button" className="col s3 m2 center-align offset-s6 offset-m8" style={{"border":"none","backgroundColor":"transparent","color":"#515B60"}} onClick={editUser}><i className="material-icons">edit</i></button>
                            <button type="button" className="col s3 m2 center-align" style={{"border":"none","backgroundColor":"transparent","color":"#515B60"}}><i className="material-icons">delete</i></button>
                        </div>
                        }
                </div>
            </div>
            <div className="row">
                <button type="submit">Submit</button>
            </div>
        </form>
    ) 

}
