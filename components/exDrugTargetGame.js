class DrugTargetGame extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
       <section id="intro_drugtargetgame" class="mt-3">
            <p>
               Classification is the task of predicting pre-defined labels for pieces of data, using a model trained with previous labeled data for each class of the domain application. 
               In this tab, you may build a special model in the medicine domain that learns which drugs (represented in a simple manner as geometric shapes) will bind to the oncogenic proteins. According to your selection you will train a model (teaching the machine how to separate the grouped images) and try to predict the group for a new image. The test of this model will be as a game, in which each player will upload a handwritten drawing with the shape that the player thinks will bind to the chosen protein target. As results, it will give a ranking table showing the player that drew the compound (shape) designed to bind to the target. The proteins have some spots in their structure that some compounds can use to form an interaction and modulate the protein function and "fix" the regulatory system in case the protein is not working properly.
            </p>
            
        </section>

        <section id="usage_drugtargetgame" class="mt-3" style="margin-bottom: 20px;" >

            <div class="accordion" id="accordionDrugTarget">
                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOneDt" aria-expanded="true" aria-controls="collapseOneDt">
                            Choose the protein and Mount the groups of shapes that will "bind" (positive class) or not (negative class) to train the model
                        </button>
                    </h2>
                    <div id="collapseOneDt" class="accordion-collapse collapse show" data-bs-parent="#accordionBuildDs">
                        <div class="accordion-body">                
                            <!-- Show and build dataset -->
                            <div class="row" >
                                <div class="col-md-12" >
                                    <h3> Choose the protein (target): </h3>
                                    
                                    <div class="row g-4 align-items-start" > 
                                    
                                         <div class="col-md-6"  >
                                            <h5> 
                                                <div class="form-check">
                                                  <input class="form-check-input" type="radio" name="protein_choice" id="prot_bcl2" checked="true" >
                                                  <label class="form-check-label" for="prot_bcl2">
                                                    BCL-2
                                                  </label>
                                                </div>
                                            </h5>
                                            <div class="col-md-12 mt-1 text-center" >
                                                <p> Protein Apoptosis regulator Bcl-2, whose mutations turn it a biomarker for Non-Hodgkin Lymphome type of cancer  </p>
                                                <img class = ' imgt-size' src="../imgs/binding_exercise/proteins/bcl2.png" />
                                            </div>
                                        </div>
                                        
                                         <div class="col-md-6"  >
                                            <h5> 
                                                <div class="form-check">
                                                  <input class="form-check-input" type="radio" name="protein_choice" id="prot_brca1" >
                                                  <label class="form-check-label" for="prot_brca1">
                                                    BRCA1
                                                  </label>
                                                </div>
                                            </h5>
                                            <div class="col-md-12 mt-1 text-center">
                                                <p> This is a tumor suppressor protein involved in the DNA damage response, is mutated in various cancer types  </p>
                                                <img class = ' imgt-size' src="../imgs/binding_exercise/proteins/brca1.png" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="col-md-12 mt-3" >
                                    <h3> Select the types of compounds that will act as binders (positive cases) and non binders of the chosen target.</h3>
                                    
                                    <div class="row g-4 align-items-start" id="datasets_area" >
                                    
                                        <div class="col-md-6"  >
                                            <h5> Not Binder: </h5>
                                            <div class="col-md-12 mt-1 text-center" id="options_notbinder" >
                                                
                                            </div>
                                            
                                            <div class="col-md-12 mt-1 text-center" style="display: none;">
                                                <input type="text" class="form-control" id="dt_class_1" value = "Not Binder" />
                                            </div>
                                            
                                            <div class="area_group col-md-12 mt-1 g-2" id="dt_elements_class_1"   >
                                            
                                            </div>
                                        </div>
                                        
                                        <div class="col-md-6 "  >
                                            <h5> Binder: </h5>
                                            <div class="col-md-12 mt-1 text-center" id="options_binder" >
                                                
                                            </div>
                                            
                                            <div class="col-md-12 mt-1 text-center" style="display: none;" >
                                                <input type="text" class="form-control" id="dt_class_2" value = "Binder" />
                                            </div>
                                            
                                            <div class="area_group col-md-12 mt-1 g-2" id="dt_elements_class_2"  >
                                            
                                            </div>
                                        </div>
                                    
                                    </div>
                                </div>
                                
                                <div class="col-md-12 mt-3 g-2" >
                                    <div class="col-md-3" style="display: none" >
                                        <label class="form-label" > Choose a Model: </label>
                                        <select id="model_ds" class="form-control " >
                                            <option value="small" > Zero knowledge </option>
                                            <!-- <option value="medium" > Medium Performance </option> -->
                                            <option value="large" selected > Refined (Transfer learning) </option>
                                        </select>
                                    </div>
                                    
                                    <div class="col-md-3">
                                         <button type="button" class="btn btn-primary disab_ds" style="margin-top: 32px;" onClick="trainBuildDtDs()" > Train </button>
                                         
                                         <p id="notice_dsdt" class="mt-2" > </p>
                                         
                                         <button type="button" class="btn btn-primary disab_ds" id="down_model" style="margin-top: 32px; display: none;" onClick="downloadModel()" > Save model </button>
                                    </div>
                                </div>
                                
                            </div>
                            
                        </div>
                    </div>
                </div>

                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwoDt" aria-expanded="true" aria-controls="collapseTwoDt">
                            Use the trained model to classify handwritten images of compound candidates to bind to the protein targets
                        </button>
                    </h2>
                    <div id="collapseTwoDt" class="accordion-collapse collapse show" data-bs-parent="#accordionClassify">
                        <div class="accordion-body">
                            <div class="row" >
                                <div class="col-md-12" >
                                    <h3> Choose the protein (target): </h3>
                                    
                                    <div class="row g-4 align-items-start" > 
                                    
                                         <div class="col-md-6"  >
                                            <h5> 
                                                <div class="form-check">
                                                  <input class="form-check-input" type="radio" name="pred_protein_choice" id="pred_prot_bcl2" checked="true" onChange="loadModel()" >
                                                  <label class="form-check-label" for="prot_bcl2">
                                                    BCL-2
                                                  </label>
                                                </div>
                                            </h5>
                                            <div class="col-md-12 mt-1 text-center" >
                                                <p> Protein Apoptosis regulator Bcl-2, whose mutations turn it a biomarker for Non-Hodgkin Lymphome type of cancer  </p>
                                                <img class = ' imgt-size' src="../imgs/binding_exercise/proteins/bcl2.png" />
                                            </div>
                                        </div>
                                        
                                         <div class="col-md-6"  >
                                            <h5> 
                                                <div class="form-check">
                                                  <input class="form-check-input" type="radio" name="pred_protein_choice" id="pred_prot_brca1" onChange="loadModel()" >
                                                  <label class="form-check-label" for="prot_brca1">
                                                    BRCA1
                                                  </label>
                                                </div>
                                            </h5>
                                            <div class="col-md-12 mt-1 text-center" >
                                                <p> This is a tumor suppressor protein involved in the DNA damage response, is mutated in various cancer types  </p>
                                                <img class = ' imgt-size' src="../imgs/binding_exercise/proteins/brca1.png" />
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <button type="button" class="btn btn-primary disab_ds" style="margin-top: 32px;" onClick="loadModel()" > Load model </button>
                                    <p id = "info_model" > </p>
                                </div>
                                
                                <div class="col-md-12" >
                                    <h3> Add players: </h3>
                                    
                                    <button type="button" class="btn btn-secondary btn-sm" style="margin-top: 32px;" onClick="addFieldPlayer()" > Add new player </button>
                                    
                                    <div class="row g-2 align-items-start" id = "players" >
                                        <div class="col-auto" >
                                            <label class="form-label mt-2" >Player name:</label>
                                            <input type="text" class="form-control" id="name_p1" placeholder="Name player 1">
                                            
                                            <label class="form-label mt-2" >Candidate drawing:</label>
                                            <input class="form-control" type="file" onchange="onLoadPreview_dt(event, 'p1')" accept="image/*" id="field_cls_predict_bds_p1" />

                                            <div id="container_predict_bds_p1" style=" margin-top: 10; display: none; " >
                                                <img id='img_predict_bds_p1' src="" width="200" height="200" alt="preview" />
                                            </div>

                                        </div>
                                    
                                    </div>
                                    
                                    <button type="button" class="btn btn-secondary btn-sm" style="margin-top: 32px; display: none;" onClick="startCamera()" > Take candidate images from webcam </button>
                                    <p id='cam_warn' class='mt-2' style='display: none' >No camera available in this device! Use the upload buttons</p>
                                    <div class="row g-2 align-items-start" id = "camera_area" style = 'display: none;' >
                                        
                                        <h3> Choose the player and take its drawing picture: </h3>
                                        <div class="col-md-12" id = 'options_player_camera' >
                                        </div>
                                        
                                        <div class="col-md-12" >
                                            <video id="video" autoplay></video>
                                            <button class="btn btn-success btn-sm" id="captureButton">Take Picture</button>
                                            <canvas id="canvas" style="display:none;"></canvas>
                                        </div>
                                    </div>
                                    
                                </div>
                                
                                <div class="col-md-12" id = "area_result_ds_dt" >
                                    <h3> Ranking: </h3>
                                    
                                    <button type="button" class="btn btn-primary disab_ds" style="margin-top: 32px;" onClick="predictFromCustomModelDt()" > Test protein binder candidates </button>
                                    <p id = "info_predict" > </p>
                                        
                                        <div class="justify-content-center text-center" >
                                            <div id="tab_cls_dt_ds" style="font-size: 50; padding: 15px: border: 2px solid blue;" > </div>
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
             .imgt-size{
                height: 250px;
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
customElements.define('drugtarget-component', DrugTargetGame);

let width = 320;
let streaming = false;
 
/* Get images from webcam option */
const video = document.getElementById('video');
async function startCamera() {
    
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ facingMode: 'user', video: true, audio: false });
        video.srcObject = stream;
        video.play();
        
        generatePlayersOptionCamera();
        camera_area.style.display = '';
        cam_warn.style.display = 'none';
        
        video.addEventListener(
          "canplay",
          (ev) => {
            if (!streaming) {
              height = video.videoHeight / (video.videoWidth / width);

              // Firefox currently has a bug where the height can't be read from
              // the video, so we will make assumptions if this happens.
              if (isNaN(height)) {
                height = width / (4 / 3);
              }

              video.setAttribute("width", width);
              video.setAttribute("height", height);
              canvas.setAttribute("width", width);
              canvas.setAttribute("height", height);
              streaming = true;
            }
          },
          false,
        );
        
    } catch (err) {
        console.error("Error accessing the camera", err);
        camera_area.style.display = 'none';
        cam_warn.style.display = '';
        alert('No camera available');
    }
}

const canvasim = document.getElementById('canvas');
const captureButton = document.getElementById('captureButton');
captureButton.addEventListener('click', () => {
    let ide = 1;
    let n = document.getElementById('players').children.length;
    for( let i=1; i<n+1; i++){
        if( document.getElementById( `camera_img_play${i}` ).checked ){
            ide = i
        }
    }
    let photo = document.getElementById( `img_predict_bds_p${ide}` );

    canvasim.width = video.videoWidth;
    canvasim.height = video.videoHeight;
    canvasim.getContext('2d').drawImage(video, 0, 0, canvasim.width, canvasim.height);
    let imageDataUrl = canvas.toDataURL('image/png');
    photo.src = imageDataUrl;
    document.getElementById( `container_predict_bds_${ide}` ).style.display='';
});

function generatePlayersOptionCamera(){
    let htmls = "";
    let n = document.getElementById('players').children.length;
    let ch = 'checked="true"';
    for( let i=1; i<n+1; i++){
        if( i>1 ){
            ch = '';
        }
        let name = `Player ${i}`
        let ninp = document.getElementById( `name_p${i}` ).value;
        if( ninp != '' ){
            name = ninp;
        }
        htmls += `
        <div class="form-check">
          <input class="form-check-input" type="radio" name="camera_img_choice" id="camera_img_play${i}" ${ch} >
          <label class="form-check-label" for="camera_img_play${i}">
            ${name}
          </label>
        </div>
        `;
    }
    document.getElementById('options_player_camera').innerHTML = htmls;
}

/* Load examples upon checkbox item selection */
function generateShapeOptionsSelection(){
     
     let classes = ['binder', 'notbinder'];
     for( let cl of classes ){
         let htmls = "";
         for( let c of Object.keys( obj_dt_ds.available_classes) ){
            htmls += `
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="checkbox" id="${cl}_sel_${c}" value="${c}" onchange="treatBinderSelection(this)" >
                  <label class="form-check-label" for="${cl}_sel_${c}"> ${c} </label>
                </div>
            `;
         }
         document.getElementById(`options_${cl}`).innerHTML = htmls;
    }
}

function treatBinderSelection(obj){
    let _class = obj.id.split('_sel_')[0];
    let oposite = ( _class=="binder" ) ? "notbinder" : "binder";
    let div_class = ( _class=="binder" ) ? "dt_elements_class_2" : "dt_elements_class_1";
    let _shape = obj.id.split('_sel_')[1];
    if( obj.checked ){
        document.getElementById(`${oposite}_sel_${_shape}`).disabled = true;
        insertShape( div_class, _class, _shape );
    }
    else{
        document.getElementById(`${oposite}_sel_${_shape}`).disabled = false;
        removeShape( _class, _shape);
    }
}

function insertShape( div_class, name_class, name_shape ){
    
    let c = name_shape
    let path = `../imgs/binding_exercise/${c}/`;
    let prefix = `${c}_sample_`;
    let setList = [];
    for ( let i=1; i <= obj_dt_ds.available_classes[c]; i++ ){
        setList.push( prefix+i )
    }
    let chosen = _shuffle_dt(setList).slice(0, 10);
    let innerImgs = "";
    for( let nimg of chosen ){
        innerImgs += `
            <div id='container_img_group_${ nimg }' class=" _img ${name_class}_img_${name_shape}" style=" padding: 5px;" >
                <img id='img_group_${ nimg }' src="${ path }/${ nimg }.png" width="100" height="100"  />
            </div>
        `;
    }
    
    document.getElementById(div_class).innerHTML += innerImgs;
}

function removeShape(name_class, name_shape){
    let elements = document.querySelectorAll(`.${name_class}_img_${name_shape}`)
    for( let el of elements){
        el.remove();
    }
}


const _shuffle_dt = ( array ) => { 
  for (let i = array.length - 1; i > 0; i--) { 
    const j = Math.floor(Math.random() * (i + 1)); 
    [array[i], array[j]] = [array[j], array[i]]; 
  } 
  return array; 
}; 

/* Transformation and training functions */
function getTrainData( classes_info, augmentation=false, factor=1 ){
    let dat = { 'x': [], 'y': [], 'class': [] };
    
    let times = 1;
    if( augmentation ){
        times = factor;
    }
    
    let info = null;
    let index = 0;
    let maxSamples = 20;
    for( let clf of classes_info  ){
        for( let el of clf.elements ){
            info = tf.browser.fromPixels( el );
            let _shape = el.id.split('_group_')[1].split('_sample_')[0]
            factor = maxSamples - obj_dt_ds.available_classes[_shape]
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

async function trainBuildDtDs(){
    if( tfvis.visor().isOpen() ){
        tfvis.visor().close();
    }

    let name_cl1 = dt_class_1.value ?? "group 1";
    let name_cl2 = dt_class_2.value ?? "group 2";
    console.log(name_cl1, name_cl2)
    if( name_cl1 == name_cl2 ){
        //alert('Choose distinct names for the groups!');
        return;
    }
    
    let elements_cl1 = document.querySelectorAll("#dt_elements_class_1 img");
    let elements_cl2 = document.querySelectorAll("#dt_elements_class_2 img");
    /*
    if( elements_cl1.length < 4 || elements_cl2.length < 4  ){
        alert('The two groups must contain at least 4 animal images!');
        return;
    }
    */
    
    let classes_info = [ 
        { 'name': name_cl1, 'elements': elements_cl1 }, 
        { 'name': name_cl2, 'elements': elements_cl2 }
    ];
    
    document.querySelectorAll('.disab_ds').forEach( e => e.disabled=true );
    
    obj_dt_ds.classes = [name_cl1, name_cl2];
    
    let inModel = model_ds.value;
    inModel = 'large';
    if( inModel == 'small' ){
        obj_dt_ds.dimension = [100, 100, 3];
        obj_dt_ds.maxDim = 100;
    }
    if( inModel == 'large' ){
        obj_dt_ds.dimension = [224, 224, 3];
        obj_dt_ds.maxDim = 224;
    }
    
    notice_dsdt.innerHTML = 'Loading model ...';
    
    let augmentation = true;
    let factor = 10;
    obj_dt_ds.train_data = getTrainData( classes_info, augmentation, factor );
    notice_dsdt.innerHTML = 'Transforming data ...';
    
    setTimeout( async function () {
        tf.engine().startScope();
        modProcess.epochs = 10;
        obj_dt_ds.model = await eval(`modProcess.getModelImage${ _capitalize(inModel) }( obj_dt_ds )`);
        
        tfvis.visor().open();
                
        notice_dsdt.innerHTML = 'Training ...';
        await modProcess.train( obj_dt_ds, obj_dt_ds.model );
        await modViz.showAccuracy( obj_dt_ds, obj_dt_ds.model );
        await modViz.showConfusion( obj_dt_ds, obj_dt_ds.model );
        obj_dt_ds.final_model = obj_dt_ds.model;
        
        tf.engine().endScope();
        
        document.querySelectorAll('.disab_ds').forEach( e => e.disabled=false );
        notice_dsdt.innerHTML = '';
        down_model.style.display='';
    }, 2000);
}

/* Save model */
function downloadModel(){
    let target = 'brca1';
    if( document.getElementById('prot_bcl2').checked ){
        target = 'bcl2';
    }
    
    /*
    let url = URL.createObjectURL(
       new Blob([JSON.stringify( obj_dt_ds.final_model, null, 2)], {
          type: "application/json",
        })
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = `model_${target}.json` ;
    link.click();
    */
    
    let filename = `model_${target}`;
    obj_dt_ds.model.save( `downloads://${filename}` ).then( ( wraped_model ) => {
        alert('Model saved in your Downloads folder')
    })
    .catch((err) => {
      console.log( err );
    });
    
}

/* Load model */
function loadModel(){
    info_predict.innerHTML = '';
    tab_cls_dt_ds.innerHTML = '';
    area_result_ds_dt.style.display = 'none';
    info_model.innerHTML = 'Loading model...';
    document.querySelectorAll('.disab_ds').forEach( e => e.disabled=true );
    
    let target = 'brca1';
    if( document.getElementById('pred_prot_bcl2').checked ){
        target = 'bcl2';
    }
    
    let u = location.href.split('/').slice(0,3).join('/')+'/ai_learning_app'
    tf.loadLayersModel( `${u}/models_drugtarget/model_${target}.json`).then( ( model ) => {
        obj_dt_ds.final_model = model;
        
        info_model.innerHTML = 'Model loaded';
        document.querySelectorAll('.disab_ds').forEach( e => e.disabled=false );
        area_result_ds_dt.style.display = '';
    })
    .catch((err) => {
      console.log( err );
    });
    
}

/* Prediction */

/* Add new player fields */
function addFieldPlayer(){
    let n = document.getElementById('players').children.length;
    let current = document.getElementById('players').innerHTML;
    let htmls = `
        <div class="col-auto" >
            <label class="form-label mt-2" >Player name:</label>
            <input type="text" class="form-control" id="name_p${n+1}" placeholder="Name player ${n+1}">
            
            <label class="form-label mt-2" > Candidate drawing:</label>
            <input class="form-control" type="file" onchange="onLoadPreview_dt(event, 'p${n+1}')" accept="image/*" id="field_cls_predict_bds_p${n+1}" />

            <div id="container_predict_bds_p${n+1}" style=" margin-top: 10; display: none; " >
                <img id='img_predict_bds_p${n+1}' src="" width="200" height="200" alt="preview" />
            </div>

        </div>
    `;
    document.getElementById('players').innerHTML += htmls;
    generatePlayersOptionCamera();
    
}

/* Show the candidate uploaded compound */
function onLoadPreview_dt(e, ide) {
    if( obj_dt_ds.final_model ){
    
    }
    const image = e.target.files[0];
    if (!image) {
        document.getElementById( `container_predict_bds_${ide}`).style.display='none';
        return
    }
    let previewUrlDs = "";
    if (previewUrlDs) URL.revokeObjectURL(previewUrlDs);
    previewUrlDs = URL.createObjectURL(image);
    document.getElementById( `img_predict_bds_${ide}` ).src = previewUrlDs;
    document.getElementById( `container_predict_bds_${ide}` ).style.display='';
}

function predictFromCustomModelDt(){
    obj_dt_ds.classes = ["Not Binder", "Binder"];
    
    if( ! obj_dt_ds.final_model ){
        alert('Model was not loaded');
        return;
    }
    
    tf.engine().startScope();
    
    let infop = {};
    let n = document.getElementById('players').children.length;
    for( let i=1; i<n+1; i++){
        let name = `Player ${i}`
        let ninp = document.getElementById( `name_p${i}` ).value;
        if( ninp != '' ){
            name = ninp;
        }
        let inpimg = document.getElementById(`img_predict_bds_p${i}`);
        if( inpimg.src != '' && inpimg.src != location.href ){
            if( Object.keys(infop).length == 0 ){
                info_predict.innerHTML = 'Testing candidates...';
                document.querySelectorAll('.disab_ds').forEach( e => e.disabled=true );
            }
            
            let inn = modProcess.getVectorFromImgTag( inpimg );
            let outcome, prob = modProcess.predictBinary( inn, obj_dt_ds, obj_dt_ds.final_model, obj_dt_ds.dimension );
            infop[name] = prob;
        }
    }
    tf.engine().endScope();
    tfvis.visor().close();
    
    info_predict.innerHTML = '';
    tab_cls_dt_ds.innerHTML = '';
    
    
    if( Object.keys(infop).length > 0 ){
        prepareRankingTable(infop);
        info_predict.innerHTML = '';
        document.querySelectorAll('.disab_ds').forEach( e => e.disabled=false );
        area_result_ds_dt.style.display='';
    }
    else{
        alert('There is no candidate image uploaded');
    }
}

function prepareRankingTable(results){
    info_predict.innerHTML = 'Preparing ranking table...';
    
    var items = Object.keys(results).map( key => [ key, results[key] ] );
    items.sort(function(first, second) {
      return second[1] - first[1];
    });
    let ord = {};
    items.forEach( el => { ord[ el[0] ] = el[1]; } );

    let inner = "";
    let i = 1;
    for( let n of Object.keys(ord) ){
        let color = 'secondary';
        if( i == 1 ){
            color = 'success';
        }
        inner += `
        <tr>
          <td class="table-${color}"> ${i} </td>
          <td class="table-${color}"> ${n} </td>
          <td class="table-${color}"> ${results[n]*100} </td>
        </tr>
        `;
        i+=1;
    }
    
    let htmls = `
      <table class="table">
          <thead>
            <tr>
              <th scope="col">Position</th>
              <th scope="col">Name</th>
              <th scope="col">% Success</th>
            </tr>
          </thead>
          
          <tbody>
            ${inner}
          </tbody>
     </table>
    `;
    tab_cls_dt_ds.innerHTML = htmls;
}


let obj_dt_ds = {};
let init_case_buildds_dt = () => {
    
    area_result_ds_dt.style.display='none';
    
    let proportions = { 'cls0': 100, 'cls1': 100 };
    obj_dt_ds = new AIExp( 'custom', 100, proportions, 70, 30,  );
    obj_dt_ds.dimension = [224, 224, 3];
    obj_dt_ds.maxDim = 224;
    obj_dt_ds.available_classes = { "square": 12, "circle": 5, "long_square": 45, "triangle": 9, "triangle_inverted": 9, "hard_binder_1": 1, "hard_binder_2": 1 };
    generateShapeOptionsSelection();

}
init_case_buildds_dt()

