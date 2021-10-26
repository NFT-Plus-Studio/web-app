<template>
  <v-container>
    <v-row>
      <v-col
        cols="12"
        sm="6"
        md="8"
      > 
        <v-row class="pa-3">
         <v-file-input
            label="Upload Images Folders" 
            filled
            multiple
            prepend-icon="mdi-camera"
            @change="onImageUpload($event)"
          ></v-file-input>
         </v-row>   
        <v-row>
          <!-- <v-img
            lazy-src="https://picsum.photos/id/11/10/6"
            max-height="300"
            max-width="500"
            src="https://picsum.photos/id/11/500/300"
          ></v-img> -->
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
              <v-icon v-else>
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
            label="layerTitle" 
            outlined
            clearable
          ></v-text-field>
          <v-slider
              v-model="rarity"
              label="Rarity (100%)"
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
         {
          name: 'Mouth',
          children: [
             {
                name: 'logo.png',
                file: 'png',
              }
          ],
        }, 
         {
          name: 'Nose',
          children: [
             {
                name: 'logo.png',
                file: 'png',
              }
          ],
        }, 
         {
          name: 'Teeth',
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
        const files = e;
        files.forEach(file => {
          // this.createImage(file);
          this.imageUploads.push({
            name: this.layerTitle + file.name.split('.').shift() + '#'  + this.rarity + '.' + file.type.replace('image/', ''),
            file:  file.name.split('.').pop()
          }) 
        }) 
      }
    }
  }
</script>
