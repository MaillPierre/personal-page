import $ from 'jquery';
import { Statement } from 'rdflib';
import dayjs from 'dayjs';
import { saveAs } from 'file-saver';
import { v4 as uuidv4 } from 'uuid';

import Autocomplete from "bootstrap5-autocomplete";
Autocomplete.init();

import { ContentPerson, ContentSocial, ContentPublications } from './Modules';
import * as config from '../../config/default.json';

$(() => {
    

    let modules = [
        new ContentPerson(config),
        new ContentSocial(config),
        new ContentPublications(config)
    ];

    modules.forEach(module => {
        module.render();
    })
});


