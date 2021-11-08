<template>
    <!-- <div class="drop-zone-container d-flex align-center justify-center mb-3">
        <p>
            Click here or drop images here <br />
            (image/png, image/gif, Max size: 10 mb)
        </p>
        <input type="file" accept="text/xml" style="display: none" />
    </div> -->
    <v-sheet
        tabindex="0"
        title="Click to grap a file from your PC!"
        color="rgba(0, 0, 0, 0.49)"
        width="100%"
        height="105"
        class="drop-zone-container pa-2"
        :class="{ 'drag-zone-drag-enter': dragover }"
        rounded
        outlined
    >
        <input type="file" accept="text/xml" style="display: none" />
        <p>
            Click here or drop images here <br />
            (image/png, image/gif, Max size: 10 mb)
        </p>
    </v-sheet>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Emit } from 'vue-property-decorator';

@Component
export default class DropFilesZone extends Vue {
    // internal properties
    dragover: boolean = false;

    mounted() {
        const dropzone = this.$el as HTMLElement;
        const fileupload = this.$el.firstElementChild as HTMLElement;
        // register listeners on your dropzone / v-sheet
        if (dropzone) {
            // register all drag & drop event listeners
            dropzone.addEventListener('dragenter', (e) => {
                e.preventDefault();
                this.dragover = true;
            });
            dropzone.addEventListener('dragover', (e) => {
                e.preventDefault();
                this.dragover = true;
            });
            dropzone.addEventListener('dragleave', (e) => {
                e.preventDefault();
                this.dragover = false;
            });
            dropzone.addEventListener('drop', (e) => {
                e.preventDefault();
                const dragevent = e as DragEvent;
                if (dragevent.dataTransfer) {
                    this.filesSelected(dragevent.dataTransfer.files);
                }
            });
        }
    }

    @Emit()
    filesSelected(fileList: FileList) {
        this.dragover = false;
    }
}
</script>

<style lang="scss">
.drop-zone-container {
    width: 100%;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid rgba(64, 19, 244, 0.6) !important;
    box-sizing: border-box;
    border-radius: 6px !important;

    p {
        font-size: 14px;
        margin: 0px !important;
    }
}
.drag-zone-drag-enter {
    border: 1px solid #ff00a1 !important;
}
</style>
