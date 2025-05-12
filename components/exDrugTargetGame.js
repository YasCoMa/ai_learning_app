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
                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            Choose the protein and Mount the groups of shapes that will "bind" (positive class) or not (negative class) to train the model
                        </button>
                    </h2>
                    <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionBuildDs">
                        <div class="accordion-body">                
                            <!-- Show and build dataset -->
                            <div class="row" >
                                <div class="col-md-12" >
                                    <h3> Choose the protein (target): </h3>
                                    
                                    <div class="row g-4 align-items-start" id="available_examples" > 
                                    
                                         <div class="col-md-6"  >
                                            <h5> 
                                                <div class="form-check">
                                                  <input class="form-check-input" type="radio" name="protein_choice" id="prot_bcl2" checked="true" >
                                                  <label class="form-check-label" for="prot_bcl2">
                                                    BCL-2
                                                  </label>
                                                </div>
                                            </h5>
                                            <div class="col-md-12 mt-1 text-center" style="display: none;">
                                                <p> Protein Apoptosis regulator Bcl-2, whose mutations turn it a biomarker for Non-Hodgkin Lymphome type of cancer  </p>
                                                <img src="../imgs/proteins/bcl2.png" />
                                            </div>
                                        </div>
                                        
                                         <div class="col-md-6"  >
                                            <h5> 
                                                <div class="form-check">
                                                  <input class="form-check-input" type="radio" name="protein_choice" id="prot_brca1" checked="true" >
                                                  <label class="form-check-label" for="prot_brca1">
                                                    BRCA1
                                                  </label>
                                                </div>
                                            </h5>
                                            <div class="col-md-12 mt-1 text-center" style="display: none;">
                                                <p> This is a tumor suppressor protein involved in the DNA damage response, is mutated in various cancer types  </p>
                                                <img src="../imgs/proteins/brca1.png" />
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
                                                <input type="text" class="form-control" id="class_1" value = "Binder" />
                                            </div>
                                            
                                            <div class="area_group col-md-12 mt-1 g-2" id="elements_class_1"   >
                                            
                                            </div>
                                        </div>
                                        
                                        <div class="col-md-6 "  >
                                            <h5> Binder: </h5>
                                            <div class="col-md-12 mt-1 text-center" id="options_binder" >
                                                
                                            </div>
                                            
                                            <div class="col-md-12 mt-1 text-center" style="display: none;" >
                                                <input type="text" class="form-control" id="class_2" value = "Not Binder" />
                                            </div>
                                            
                                            <div class="area_group col-md-12 mt-1 g-2" id="elements_class_2"  >
                                            
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
                                         <button type="button" class="btn btn-primary disab_ds" style="margin-top: 32px;" onClick="trainBuildDs()" > Train </button>
                                         
                                         <p id="notice_ds" class="mt-2" > </p>
                                         
                                         <button type="button" class="btn btn-primary disab_ds" id="down_model" style="margin-top: 32px; display: none;" onClick="downloadModel()" > Save model </button>
                                    </div>
                                </div>
                                
                            </div>
                            
                        </div>
                    </div>
                </div>

                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                            Use your model to classify new images
                        </button>
                    </h2>
                    <div id="collapseTwo" class="accordion-collapse collapse show" data-bs-parent="#accordionClassify">
                        <div class="accordion-body">

                            <div class="row g-2 align-items-start"  >
                                <div class="col-auto" id='fromImageDs' >
                                    <label class="form-label" >Choose an image file:</label>
                                    <input class="form-control" type="file" onchange="onLoadPreview_buildDs(event)" accept="image/*" id="field_cls_predict_bds" />

                                    <div id="container_predict_bds" style=" margin-top: 10; display: none; " >
                                        <img id='img_predict_bds' src="" width="200" height="200" alt="preview" />
                                    </div>

                                </div>
                                

                                <div class="col-auto">
                                    <button type="button" class="btn btn-primary disab_ds" style="margin-top: 32px;" onClick="predictFromCustomModel()" > Predict </button>
                                    
                                    <div id="area_result_ds" >
                                        <h4 class="mt-4"> Result: </h4>

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
customElements.define('drugtarget-component', DrugTargetGame);

/* Load examples upon checkbox item selection */
function generateShapeOptionsSelection(){
     let available_classes = { "square": 12, "circle": 5, "long_square": 45, "triangle": 9, "triangle_inverted": 9 };
     
     let classes = ['binder', 'notbinder'];
     for( let cl of classes ){
         let htmls = "";
         for( let c of Object.keys( obj_ds_dt.available_classes) ){
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
    let div_class = ( _class=="binder" ) ? "elements_class_2" : "elements_class_1";
    let _shape = obj.id.split('_sel_')[0];
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
    let available_classes = { "bird": 18, "lion": 18, "cat": 18, "dog": 18 };
    
    c = name_shape
    let path = `../imgs/binding_exercise/${c}/`;
    let prefix = `${c}_sample_`;
    let setList = [];
    for ( let i=1; i <= obj_dt_ds.available_classes[c]; i++ ){
        setList.push( prefix+i )
    }
    let chosen = _shuffle(setList).slice(0, 10);
    let innerImgs = "";
    for( let nimg of chosen ){
        innerImgs += `
            <div id='container_img_group_${ nimg }' class="${name_class}_img_${name_shape}" style=" padding: 5px;" >
                <img id='img_group_${ nimg }' src="${ path }/${ nimg }.png" width="100" height="100"  />
            </div>
        `;
    }
    
    document.getElementById(div_class).innerHTML = htmls;
}

function removeShape(name_class, name_shape){
    let elements = document.querySelectorAll(`.${name_class}_img_${name_shape}`)
    for( let el of elements){
        el.remove();
    }
}


const _shuffle = ( array ) => { 
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
    let name_cl1 = class_1.value ?? "group 1";
    let name_cl2 = class_2.value ?? "group 2";
    class_1.value = name_cl1;
    class_2.value = name_cl2;
    
    if( name_cl1 == name_cl2 ){
        alert('Choose distinct names for the groups!');
        return;
    }
    
    let elements_cl1 = document.querySelectorAll("#elements_class_1 img");
    let elements_cl2 = document.querySelectorAll("#elements_class_2 img");
    if( elements_cl1.length < 4 || elements_cl2.length < 4  ){
        alert('The two groups must contain at least 4 animal images!');
        return;
    }
    
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
    
    notice_ds.innerHTML = 'Loading model ...';
    
    let augmentation = true;
    let factor = 10;
    obj_dt_ds.train_data = getTrainData( classes_info, augmentation, factor );
    notice_ds.innerHTML = 'Transforming data ...';
    
    setTimeout( async function () {
        tf.engine().startScope();
        obj_dt_ds.model = await eval(`modProcess.getModelImage${ _capitalize(inModel) }( obj_dt_ds )`);
        
        tfvis.visor().open();
                
        notice_ds.innerHTML = 'Training ...';
        let fitted_model = await modProcess.train( obj_dt_ds, obj_dt_ds.model );
        await modViz.showAccuracy( obj_dt_ds, obj_dt_ds.model );
        await modViz.showConfusion( obj_dt_ds, obj_dt_ds.model );
        obj_dt_ds.final_model = fitted_model;
        
        tf.engine().endScope();
        
        document.querySelectorAll('.disab_ds').forEach( e => e.disabled=false );
        notice_ds.innerHTML = '';
    }, 2000);
}

/* Save model */
function downloadModel(){
    let url = URL.createObjectURL(
       new Blob([JSON.stringify( obj_dt_ds.final_model, null, 2)], {
          type: "application/json",
        })
    );
    const link = document.createElement("a");
    link.href = url;
    link.click();
}

/* Prediction */
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
        if( obj_dt_ds.model != null ){
            tf.engine().startScope();
        
            let inn = modProcess.getVectorFromImgTag( img_predict_bds );
            let outcome = modProcess.predictBinary( inn, obj_dt_ds, obj_dt_ds.model, obj_dt_ds.dimension );
            
            tf.engine().endScope();
            
            tfvis.visor().close();
            document.getElementById('result_cls_ds').innerHTML = `<span> ${outcome} </span>`;
            area_result_ds.style.display='';
        }
        else{
            alert('You must train the model before applying it');
        }
    }
    else{
        alert('There is no image in selection');
    }
}



let obj_dt_ds = {};
let init_case_buildds_dt = () => {
    obj_dt_ds.available_classes = { "square": 12, "circle": 5, "long_square": 45, "triangle": 9, "triangle_inverted": 9 };
    
    // Load options of compound shapes
    generateShapeOptionsSelection();
    
    area_result_ds.style.display='none';
    
    let proportions = { 'cls0': 100, 'cls1': 100 };
    obj_dt_ds = new AIExp( 'custom', 100, proportions, 70, 30,  );
    obj_dt_ds.dimension = [224, 224, 3];
    obj_dt_ds.maxDim = 224;

}
init_case_buildds_dt()

