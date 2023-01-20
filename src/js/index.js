import $ from 'jquery';
import { Statement } from 'rdflib';
import dayjs from 'dayjs';
import { saveAs } from 'file-saver';
import { v4 as uuidv4 } from 'uuid';

import * as config from '../../config/default.json';

import Autocomplete from "bootstrap5-autocomplete";
Autocomplete.init();

import * as $rdf from 'rdflib';
import EventEmitter from 'events';

var RDF = $rdf.Namespace("http://www.w3.org/1999/02/22-rdf-syntax-ns#");
var RDFS = $rdf.Namespace("http://www.w3.org/2000/01/rdf-schema#");
var OWL = $rdf.Namespace("http://www.w3.org/2002/07/owl#");
var XSD = $rdf.Namespace("http://www.w3.org/2001/XMLSchema#");
var DCAT = $rdf.Namespace("http://www.w3.org/ns/dcat#");
var FOAF = $rdf.Namespace("http://xmlns.com/foaf/0.1/");
var PROV = $rdf.Namespace("http://www.w3.org/ns/prov#");
var SCHEMA = $rdf.Namespace("http://schema.org/");
var VOID = $rdf.Namespace("http://rdfs.org/ns/void#");
var SD = $rdf.Namespace("http://www.w3.org/ns/sparql-service-description#");
var DCE = $rdf.Namespace("http://purl.org/dc/elements/1.1/");
var DCT = $rdf.Namespace("http://purl.org/dc/terms/");
var SKOS = $rdf.Namespace("http://www.w3.org/2004/02/skos/core#");
var PAV = $rdf.Namespace("http://purl.org/pav/");
var MOD = $rdf.Namespace("https://w3id.org/mod#");
var DCMITYPE = $rdf.Namespace("http://purl.org/dc/dcmitype/");

var EX = $rdf.Namespace("https://e.g/#");
const exampleDataset = EX('dataset');

var personConfig = config.Person;
var personName = personConfig.name;
$(() => {
    console.log("TEST")
    console.log(personName)
    $("#titleHeader").html(personName);
});