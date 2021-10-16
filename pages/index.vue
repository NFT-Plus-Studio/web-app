<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card class="logo py-4 d-flex justify-center">
        <NuxtLogo /> 
      </v-card>
      <v-card>
        <v-card-title class="headline d-flex justify-center">
          Welcome to the NTF + Studio
        </v-card-title>
        <v-card-actions  
          class="d-flex justify-center"
            > 
          <v-btn
            color="primary"
            nuxt
            to="/app"
          >
            Get Started
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>
