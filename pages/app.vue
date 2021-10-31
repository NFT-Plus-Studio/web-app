<template>
  <v-container>
    <v-row>
      <v-col
        cols="12"
        sm="6"
        md="8"
      > 
        <v-row class="pa-3"> 
               <div :class="['dropZone', dragging ? 'dropZone-over' : '']" @dragenter="dragging = true" @dragleave="dragging = false">
                  <div class="dropZone-info" @drag="onImageUpload($event)">
                    <span class="fa fa-cloud-upload dropZone-title"></span>
                    <span class="dropZone-title">Drop file or click to upload</span>
                    <div class="dropZone-upload-limit-info">
                      <div>({{imageUploads.length}}) Files Uploaded</div>
                      <div>extension support: txt</div>
                      <div>maximum file size: 5 MB</div>
                    </div>
                  </div>
                  <input type="file" multiple webkitdirectory @change="onImageUpload($event)"  >
              </div>
              <!-- <div class="uploadedFile-info">
                  <div>fileName: {{ file.name }}</div>
                  <div>fileZise(bytes): {{ file.size }}</div>
                  <div>extension：{{ extension }}</div>
              </div> -->
         </v-row>   
        <v-row>
          <v-img 
            max-height="300"
            max-width="500"
            :src="pictureUrl"
          ></v-img>
        </v-row>  
      </v-col>
        <v-col
          cols="6"
          md="4"
          lg="4"
        >
      <v-card
        class="rounded"  
        tile
      >
        <v-container>
        <h4 class="py-3">
          Layers
        </h4> 
        <v-text-field
          v-model="layerTitle"
          outlined
          label="Add Layer"
          append-outer-icon="mdi-plus-box"
          placeholder="New Layer"
          @keydown.enter="addLayer()"
        ></v-text-field> 
          <v-treeview
            v-model="tree"
            :open="initiallyOpen"
            :items="items"
            activatable
            rounded
            item-key="name"
            open-on-click
          >
            <template #prepend="{ item, open }">
              <v-icon v-if="!item.file" @click="setTitle(item.name)">
                {{ open ? 'mdi-folder-open' : 'mdi-folder' }}
              </v-icon>
              <v-icon v-else @click="setPictureName(item)">
                {{ files[item.file] }}
              </v-icon>
            </template>
          </v-treeview>
        </v-container>
        </v-card>
        <v-card 
          elevation="2"
          outlined 
          hover
          class="my-3"
          style="border-radius: 0.5em"
          >
          
        <v-card-title>
          Layer Settings
           
        </v-card-title>
        <v-container>
           <v-text-field
            v-model="layerTitle"
            label="Layer Title" 
            outlined
            clearable
          ></v-text-field>
          <v-text-field
            v-model="pictureName"
            label="Picture Name" 
            outlined
            clearable
            @keydown.enter="updatePictureName()"
          ></v-text-field>
          <v-slider
              v-model="rarity"
              label="Rarity (100%)" 
              @change="updatePictureName()"
          >
          </v-slider>
        </v-container>
      </v-card>
      </v-col>
    </v-row>
  </v-container> 
</template>

 <script>
  export default {
    data: () => ({
      initiallyOpen: ['public'],
      files: {  
        jpg: 'mdi-file-image',
        jpeg: 'mdi-file-image',
        png: 'mdi-file-image',
        txt: 'mdi-file-document-outline', 
      },
      layerTitle: '',
      pictureName: '',
      pictureUrl: 'https://www.herbalhillsglobal.com/wp-content/uploads/2019/12/no-image_7279.png',
      file: '',
      dragging: false,
      rarity: 50,
      imageUploads: [],
      tree: [],
      items: [ 
        {
          name: 'Face',
          children: [
             {
                name: 'logo.png',
                file: 'png',
              }
          ],
        },   
      ],
    }),
    methods: {
      setTitle(title) {
        this.layerTitle = title;
      },
      setPictureName(file){ 
        console.log(file);
        this.pictureName = file.name;
        this.pictureUrl = file.url;
        console.log(this.pictureUrl);
      },
      layerExists(){
        return true
      },
      addLayer() { 
        // todo: ensure only unique layer titles are added
       this.updateLayer();
      },
      updateLayer() { 
        this.items.push({
          name: this.layerTitle,
          children: this.imageUploads
        });
      },
      onImageUpload(e) {  
        const filesList = e.target.files || e.dataTransfer.files; 
        // ensure files had something
         if (!filesList.length) {
          this.dragging = false;
          return;
        } 

        // check to see if it's a folder of images
        // if(filesList)
        const testFiles = [];
        let groupdFiles = [];
        for (const value of Array.from(filesList)) {  
            if(!value.webkitRelativePath.includes('.DS_Store')) {
              const reader = new FileReader(); 
              reader.readAsDataURL(value)
              reader.onload = (e) => {
              const image = e.target.result;
              // console.log("WTF", image);
              const cleanedPath = value.webkitRelativePath.replace(/\s/g, '').split('/');  
              let rawFiles = {};
              if(image){
                rawFiles = {
                  layerName: cleanedPath[1], 
                  name: cleanedPath[1]+ value.name.split('.').shift() + '#'  + this.rarity + '.' + value.type.replace('image/', ''),
                  file:  value.name.split('.').pop(), 
                  url: image
                }  
                testFiles.push(rawFiles);
                groupdFiles = testFiles.reduce(function (r, a) {
                        r[a.layerName] = r[a.layerName] || [];
                        r[a.layerName].push(a);
                        return r;
                    }, Object.create(null));  
              }
            }
          }
        }   
         setTimeout(() => {
           console.log(testFiles);

          for (const [key, value] of Object.entries(groupdFiles)) {
          console.log(`${key}: ${value}`);
              this.items.push({
                name: key,
                children: value
                })
            }  
         }, 1000);
      }, 
      updatePictureName() { 
        this.items.forEach(image => { 
          console.log("Image data: ", image);
          if(image.name === this.layerTitle) {
            if(image.children) { 
              image.children.forEach(child => {
                if(child.name === this.pictureName) {
                  child.name = ''; 
                  child.name = this.layerTitle + child.name.split('.').shift() + '#'  + this.rarity + '.' + child.file; 
                  this.setPictureName(child.name);
                  this.previewPicture();
                }
              })
            }
          } 
        })
      },
      previewPicture(){
        console.log("about to preview image");
      },
      onFormUpload() {
        this.$axios.post('/upload', {})
                 .then((res) => {
                     // Perform Success Action
                     console.log(res);
                 })
                 .catch((error) => {
                     // error.response.status Check status code
                     console.log(error);
                 }).finally(() => {
                     // Perform action in always
                     console.log("done")
                 });
      }, 
    }
  }
</script>

<style scoped>
.dropZone {
  width: 100%;
  height: 200px;
  position: relative;
  border: 2px dashed #eee;
}

.dropZone:hover {
  border: 2px solid #2e94c4;
}

.dropZone:hover .dropZone-title {
  color: #1975A0;
}

.dropZone-info {
  color: #A8A8A8;
  position: absolute;
  top: 50%;
  width: 100%;
  transform: translate(0, -50%);
  text-align: center;
}

.dropZone-title {
  color: #787878;
}

.dropZone input {
  position: absolute;
  cursor: pointer;
  top: 0px;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
}

.dropZone-upload-limit-info {
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
}

.dropZone-over {
  background: #5C5C5C;
  opacity: 0.8;
}

.dropZone-uploaded {
  width: 80%;
  height: 200px;
  position: relative;
  border: 2px dashed #eee;
}

.dropZone-uploaded-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #A8A8A8;
  position: absolute;
  top: 50%;
  width: 100%;
  transform: translate(0, -50%);
  text-align: center;
}

.removeFile {
  width: 200px;
}
</style>

 
