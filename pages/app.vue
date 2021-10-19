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
            prepend-icon="mdi-camera"
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
          outlined
          label="Add Layer"
          append-outer-icon="mdi-plus-box"
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
              <v-icon v-if="!item.file">
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
            v-model="message4"
            label="face"
            outlined
            clearable
          ></v-text-field>
          <v-slider
              v-model="max"
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
        png: 'mdi-file-image',
        txt: 'mdi-file-document-outline', 
      },
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
  }
</script>
