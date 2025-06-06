class BuildDataset extends HTMLElement {
constructor() {
    super();
}

connectedCallback() {
    this.innerHTML = `
        <section id="intro_buildds" class="mt-3">
            <p>
                La classificació és la tasca de predir etiquetes predefinides per a conjunts de dades, utilitzant un model entrenat amb dades etiquetades prèviament per a cada classe de l'aplicació de domini. En aquesta pestanya, pots construir els teus propis conjunts de dades de mostra en dos grups i provar com es comporta el model segons la teva selecció d'imatges. En funció de la teva selecció, entrenaràs un model (ensenyant a la màquina com separar les imatges agrupades) i intentaràs predir el grup per a una nova imatge.

            </p>
            
        </section>

        <section id="usage_classification" class="mt-3" style="margin-bottom: 20px;" >

            <div class="accordion" id="accordionBuildDs">
                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            Muntar els grups d'imatges i entrenar un model
                        </button>
                    </h2>
                    <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionBuildDs">
                        <div class="accordion-body">                
                            <!-- Mostrar i construir conjunt de dades -->
                            <div class="row" >
                                <div class="col-md-12" >
                                    <h3> Imatges disponibles: </h3>
                                    
                                    <div class="row g-4 align-items-start" id="available_examples" > </div>
                                </div>
                                
                                <div class="col-md-12 mt-3" >
                                    <h3> Arrossega imatges dels tipus d'animals mostrats a dalt i mou-les a les dues àrees de grup a continuació. Després, dona un nom a aquests grups com desitgis.</h3>
                                    
                                    <div class="row g-4 align-items-start" id="datasets_area" >
                                    
                                        <div class="col-md-6"  >
                                            <h5> Grup 1: </h5>
                                            <div class="col-md-12 mt-1 text-center">
                                                <input type="text" class="form-control" id="class_1" placeholder="Nom del grupo 1" />
                                            </div>
                                            
                                            <div class="area_group col-md-12 mt-1 g-2" id="elements_class_1" ondrop="drop(event)" ondragover="allowDrop(event)"  >
                                            
                                            </div>
                                        </div>
                                        
                                        <div class="col-md-6 "  >
                                            <h5> Grup 2: </h5>
                                            <div class="col-md-12 mt-1 text-center">
                                                <input type="text" class="form-control" id="class_2" placeholder="Nom del grupo 2" />
                                            </div>
                                            
                                            <div class="area_group col-md-12 mt-1 g-2" id="elements_class_2" ondrop="drop(event)" ondragover="allowDrop(event)"  >
                                            
                                            </div>
                                        </div>
                                    
                                    </div>
                                </div>
                                
                                <div class="col-md-12 mt-3 g-2" >
                                    <div class="col-md-3" style="display: block" >
                                        <label class="form-label" > Tria un Model: </label>
                                        <select id="model_ds" class="form-control " >
                                            <option value="small" > Coneixement zero </option>
                                            <option value="large" selected > Refinat (Transferir l'aprenentatge) </option>
                                        </select>
                                    </div>
                                    
                                    <div class="col-md-3">
                                        <button type="button" class="btn btn-primary disab_ds" style="margin-top: 32px;" onClick="trainBuildDs()" > Entrenar </button>
                                        
                                        <p id="notice_ds" class="mt-2" > </p>
                                    </div>
                                </div>
                                
                            </div>
                            
                        </div>
                    </div>
                </div>

                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                            Utilitza el teu model per classificar noves imatges
                        </button>
                    </h2>
                    <div id="collapseTwo" class="accordion-collapse collapse show" data-bs-parent="#accordionClassify">
                        <div class="accordion-body">

                            <div class="row g-2 align-items-start"  >
                                <div class="col-auto" id='fromImageDs' >
                                    <label class="form-label" >Tria un fitxer d'imatge:</label>
                                    <input class="form-control" type="file" onchange="onLoadPreview_buildDs(event)" accept="image/*" id="field_cls_predict_bds" />

                                    <div id="container_predict_bds" style=" margin-top: 10; display: none; " >
                                        <img id='img_predict_bds' src="" width="200" height="200" alt="preview" />
                                    </div>

                                </div>
                                

                                <div class="col-auto">
                                    <button type="button" class="btn btn-primary disab_ds" style="margin-top: 32px;" onClick="predictFromCustomModel()" > Predecir </button>
                                    
                                    <div id="area_result_ds" >
                                        <h4 class="mt-4"> Resultat: </h4>

                                        <div id="result_cls_ds" style="font-size: 50; padding: 15px: border: 2px solid blue;" > </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>

            </div>

        </section>

        <style >
            .area_group{
                border-radius: 15px;
                padding: 10px;
                border: 1px;
                min-width: 300px;
                min-height: 300px;
                border: 1px solid #ccc;
            }
        
            ._img {
                display: inline-block;
                position: relative;
                cursor: -webkit-grab; cursor: grab;
            } 

            ._img > i {
                display: none;
                color: #f00;
            }
            
            #datasets_area {
                ._img {
                    cursor: pointer;
                    font-color: #f00;
                }
                ._img:hover > i {
                    display: block !important;
                    top: 50%;
                    left: 50%;
                    position: absolute;
                    transform: translate(-50%, -50%);
                }
            }
        </style>
    `;
}
}
customElements.define('buildds-component', BuildDataset);

/* Área de construcción de conjuntos de datos */
function allowDrop(ev) {
ev.preventDefault();
}

function drag(ev) {
ev.dataTransfer.setData("identifier", ev.target.id);
}

function drop(ev) {
ev.preventDefault();
var data = ev.dataTransfer.getData("identifier");
ev.target.appendChild( document.getElementById( "container_"+data ) );
}

const _capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
const _shuffle = ( array ) => { 
for (let i = array.length - 1; i > 0; i--) { 
    const j = Math.floor(Math.random() * (i + 1)); 
    [array[i], array[j]] = [array[j], array[i]]; 
} 
return array; 
}; 

function loadExamplesClasses(){
    let available_classes = { "bird": 18, "lion": 18, "cat": 18, "dog": 18 };
    let tclasses = { "bird": "Ocell", "lion": "Lleó", "cat": "Gat", "dog": "Gos" };
    
    let htmls = "";
    for( let c of Object.keys(available_classes) ){
        let path = `../examples/expSelfBuildData/${c}`;
        let prefix = c[0];
        let setList = [];
        for ( let i=1; i <= available_classes[c]; i++ ){
            setList.push( prefix+i )
        }
        let chosen = _shuffle(setList).slice(0, 10);
        let innerImgs = "";
        for( let nimg of chosen ){
            innerImgs += `
                <div id='container_img_group_${ nimg }' class="_img" style=" padding: 5px;" draggable="true" ondragstart="drag(event)" onclick="remove(this)" >
                    <i class="fa-solid fa-circle-xmark fa-2x" ></i>
                    
                    <img id='img_group_${ nimg }' src="${ path }/${ nimg }.png" width="100" height="100"  />
                </div>
            `;
        }
        
        // <div class="col-auto" id="cls_${c}" >
        htmls += `
            <div class="col-md-6" id="cls_${c}" >
                <h5> ${ tclasses[c] } </h5>
                <div class="col-md-12" id="content_${c}" >
                    ${innerImgs}
                </div>
                
            </div>
        `;
    }
    
    document.getElementById('available_examples').innerHTML = htmls;
}

function remove( obj ){
    let parent = obj.parentNode.id;
    
    if( parent.indexOf('elements_class') == 0 ){
        let map = { 'b': 'bird', 'c': 'cat', 'd': 'dog', 'l': 'lion' };
        let prefix = obj.id.split('_').slice(-1)[0][0];
        let classDiv = eval( `content_${ map[prefix] }` );
        classDiv.appendChild( obj );
    }
}

/* Transformation and training functions */
function getTrainData( classes_info, augmentation=false, factor=1 ){
    let dat = { 'x': [], 'y': [], 'class': [] };
    
    let times = 1;
    if( augmentation ){
        times = factor;
    }
    
    let info = null;
    let index = 0;
    for( let clf of classes_info  ){
        for( let el of clf.elements ){
            info = tf.browser.fromPixels( el );
            for( let i=0; i<factor; i++ ){
                dat.x.push( info );
                dat.y.push( index );
                dat.class.push( clf.name );
            }
        }
        index += 1;
    }
    
    return dat;
}

async function trainBuildDs(){
    let name_cl1 = class_1.value ?? "Grup 1";
    let name_cl2 = class_2.value ?? "Grup 2";
    class_1.value = name_cl1;
    class_2.value = name_cl2;
    
    if( name_cl1 == name_cl2 ){
        alert('Tria noms diferents per als grups!');
        return;
    }

    let elements_cl1 = document.querySelectorAll("#elements_class_1 img");
    let elements_cl2 = document.querySelectorAll("#elements_class_2 img");
    if( elements_cl1.length < 4 || elements_cl2.length < 4  ){
        alert("Els dos grups han de contenir almenys 4 imatges d'animals!");
        return;
    }
        
    let classes_info = [ 
        { 'name': name_cl1, 'elements': elements_cl1 }, 
        { 'name': name_cl2, 'elements': elements_cl2 }
    ];
    
    document.querySelectorAll('.disab_ds').forEach( e => e.disabled=true );
    
    obj_ds.classes = [name_cl1, name_cl2];
    
    let inModel = model_ds.value;
    inModel = 'large';
    if( inModel == 'small' ){
        obj_ds.dimension = [100, 100, 3];
        obj_ds.maxDim = 100;
    }
    if( inModel == 'large' ){
        obj_ds.dimension = [224, 224, 3];
        obj_ds.maxDim = 224;
    }
    
    notice_ds.innerHTML = 'Carregant model ...';
    
    let augmentation = true;
    let factor = 20;
    obj_ds.train_data = getTrainData( classes_info, augmentation, factor );
    notice_ds.innerHTML = 'Transformant dades ...';
    
    setTimeout( async function () {
        tf.engine().startScope();
        obj_ds.model = await eval(`modProcess.getModelImage${ _capitalize(inModel) }( obj_ds )`);
        
        tfvis.visor().open();
                
        notice_ds.innerHTML = 'Entrenant ...';
        let fitted_model = await modProcess.train( obj_ds, obj_ds.model );
        await modViz.showAccuracy( obj_ds, obj_ds.model );
        await modViz.showConfusion( obj_ds, obj_ds.model );
        
        tf.engine().endScope();
        
        document.querySelectorAll('.disab_ds').forEach( e => e.disabled=false );
        notice_ds.innerHTML = '';
    }, 2000);
}

/* Predicción */
let previewUrlDs = "";
function onLoadPreview_buildDs(e) {
    const image = e.target.files[0];
    if (!image) {
        document.getElementById("container_predict_bds").style.display='none';
        return
    }
    if (previewUrlDs) URL.revokeObjectURL(previewUrlDs);
    previewUrlDs = URL.createObjectURL(image);
    document.getElementById("img_predict_bds").src = previewUrlDs;
    document.getElementById("container_predict_bds").style.display='';
}

function predictFromCustomModel(){
    let input = document.getElementById('field_cls_predict_bds');
    if( input.files.length > 0 ){
        if( obj_ds.model != null ){
            tf.engine().startScope();
        
            let inn = modProcess.getVectorFromImgTag( img_predict_bds );
            let outcome, prob = modProcess.predictBinary( inn, obj_ds, obj_ds.model, obj_ds.dimension );
            
            tf.engine().endScope();
            
            tfvis.visor().close();
            document.getElementById('result_cls_ds').innerHTML = `<span> ${outcome} </span>`;
            area_result_ds.style.display='';
        }
        else{
            alert('Has d’entrenar el model abans d’aplicar-lo');
        }
    }
    else{
        alert('No hi ha cap imatge seleccionada');
    }
}




let obj_ds = {};
let init_case_buildds = () => {
    // Cargando imágenes disponibles en contenedores
    loadExamplesClasses();
    
    area_result_ds.style.display='none';
    
    let proportions = { 'cls0': 100, 'cls1': 100 };
    obj_ds = new AIExp( 'custom', 100, proportions, 70, 30 );
    obj_ds.dimension = [60, 60, 3];
    obj_ds.maxDim = 60;

}
init_case_buildds()
