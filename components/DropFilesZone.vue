<template>
    <label
        width="100%"
        class="drop-zone-container pa-2"
        :class="{ 'drag-zone-drag-enter': dragover }"
        for="select-file-input"
    >
        <input
            id="select-file-input"
            type="file"
            multiple
            @change="onSelectFilesByUploadInput"
            accept="image/png,image/gif"
        />
        <p>
            Click here or drop images here <br />
            (image/png, image/gif, Max size: 10 mb)
        </p>
    </label>
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
        // const fileupload = this.$el.firstElementChild as HTMLElement;

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

    onSelectFilesByUploadInput(event: any) {
        this.filesSelected(event.target.files as FileList);
    }

    @Emit()
    filesSelected(_fileList: FileList) {
        this.dragover = false;
    }
}
</script>

<style lang="scss">
.drop-zone-container {
    width: 100%;
    height: 105px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid rgba(64, 19, 244, 0.6) !important;
    background-color: rgba(0, 0, 0, 0.49);
    box-sizing: border-box;
    border-radius: 6px !important;
    position: relative;
    cursor: pointer;

    p {
        font-size: 0.9rem;
        margin: 0px !important;
    }

    #select-file-input {
        // visibility: hidden;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        visibility: hidden;
    }

    #select-file-input::-webkit-file-upload-button {
        display: none;
    }

    #select-file-input::after {
        -webkit-user-select: none;
        visibility: hidden;
        cursor: pointer;
        outline: none;
    }
}
.drag-zone-drag-enter {
    border: 1px solid #ff00a1 !important;
}
</style>
