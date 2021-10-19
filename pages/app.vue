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
          rounded
          hoverable
          activatable
         :items="items"></v-treeview>
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
      items: [
        {
          id: 1,
          name: 'Face :',
          children: [
            { id: 2, name: 'Calendar : app' },
            { id: 3, name: 'Chrome : app' },
            { id: 4, name: 'Webstorm : app' },
          ],
        },
        {
          id: 5,
          name: 'Eyes :',
          children: [
            {
              id: 6,
              name: 'vuetify :',
              children: [
                {
                  id: 7,
                  name: 'src :',
                  children: [
                    { id: 8, name: 'index : ts' },
                    { id: 9, name: 'bootstrap : ts' },
                  ],
                },
              ],
            },
            {
              id: 10,
              name: 'Nose :',
              children: [
                {
                  id: 11,
                  name: 'src :',
                  children: [
                    { id: 12, name: 'v-btn : ts' },
                    { id: 13, name: 'v-card : ts' },
                    { id: 14, name: 'v-window : ts' },
                  ],
                },
              ],
            },
          ],
        },
        {
          id: 15,
          name: 'Hair :',
          children: [
            { id: 16, name: 'October : pdf' },
            { id: 17, name: 'November : pdf' },
            { id: 18, name: 'Tutorial : html' },
          ],
        },
        {
          id: 19,
          name: 'Arms :',
          children: [
            {
              id: 20,
              name: 'Tutorials :',
              children: [
                { id: 21, name: 'Basic layouts : mp4' },
                { id: 22, name: 'Advanced techniques : mp4' },
                { id: 23, name: 'All about app : dir' },
              ],
            },
            { id: 24, name: 'Intro : mov' },
            { id: 25, name: 'Conference introduction : avi' },
          ],
        },
      ],
    }),
  }
</script>
