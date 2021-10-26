<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
          class="px-4"
        >
          <v-text-field
            v-model="collectionConfig.name"
            :counter="12"
            :rules="nameRules"
            label="Project Name"
            required
            outlined
            dense
          ></v-text-field>

          <v-text-field
            v-model="collectionConfig.description"
            :rules="emailRules"
            label="Project Description"
            required
            outlined
            dense
          ></v-text-field>

          <v-select
            v-model="select"
            :items="items"
            :rules="[v => !!v || 'Item is required']"
            label="Collection Size"
            required
            outlined
            dense
          ></v-select>
          <v-row >
            <v-col>
              <v-text-field
                v-model="collectionConfig.maxY"
                hide-details
                single-line
                label="900"
                type="number"
                outlined
                dense
              />
            </v-col>
            <v-col>
            <v-text-field
              v-model="collectionConfig.maxX"
              hide-details
              single-line
              label="900"
              type="number"
              outlined
              dense
             />
            </v-col>
          </v-row> 
          <br/>
          <v-slider
            v-model="max"
            label="Uniqueness" 
          >
          </v-slider>
          <v-checkbox
            v-model="checkbox"
            :rules="[v => !!v || 'You must agree to continue!']"
            label="Agree to terms?"
            required
          ></v-checkbox>

          <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="validate"
          >
            Save
          </v-btn>

          <v-btn
            color="warning"
            class="mr-4"
            @click="reset"
          >
            Reset
          </v-btn>
        </v-form>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
      <v-spacer /> 
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-navigation-drawer
      v-model="rightDrawer"
      :right="right"
      temporary
      fixed
    >
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light>
              mdi-repeat
            </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-footer
      :absolute="!fixed"
      app
    >
      <span> NTF + Studio  &copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      collectionConfig: {
        name: 'My First NFT',
        description: '',
        collectionSize: 0,
        shuffleLayerConfigurations: false,
        layerOrder: [],
        maxY: 900,
        maxX: 900,
        uniqeness: 100
      },
      clipped: true,
      drawer: true,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Home',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'App',
          to: '/app'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'NFT + Studio'
    }
  }
}
</script>
