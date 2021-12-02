import Vue from 'vue';
import Component from 'vue-class-component';
import _ from 'underscore';

export interface CollectionSettings {
    id: string;
    name: string;
    emailAddress: string;
    collectionSize: number;
    description: string;
}

@Component
export class Collection extends Vue {
    // TODO: move to mixin
    parseToApiData(
        collectionSettings: CollectionSettings,
        layers: any[]
    ): {
        collectionConfig: any;
        files: File[];
    } {
        const collectionConfig = {
            title: collectionSettings.name,
            collectionSize: collectionSettings.collectionSize,
            layersOrder: _.map(layers, (layer) => layer.name.replace('_', ' ')),
            shuffleLayerConfigurations: false,
            description: collectionSettings.description,
            userEmailAddress: collectionSettings.emailAddress,
        };

        const files: File[] = [];
        // rename the files
        for (const layer of layers) {
            for (const trait of layer.elements) {
                const fileType = trait.fileInfo.type.split('/')[1];
                const modifiedFileName = `${layer.name.replace('_', ' ')}_${
                    trait.name
                }#${trait.rarity}.${fileType}`;
                const newFile = new File([trait.file], modifiedFileName);
                files.push(newFile);
            }
        }

        return {
            collectionConfig,
            files,
        };
    }
}
