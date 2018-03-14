/* tslint:disable:object-literal-sort-keys */
const hydraNamespace = "http://www.w3.org/ns/hydra/core#";
export let hydra = {
  namespace: hydraNamespace,

  entrypoint: hydraNamespace + "entrypoint",
  description: hydraNamespace + "description",
  title: hydraNamespace + "title",
  apiDocumentation: hydraNamespace + "apiDocumentation",
  supportedClass: hydraNamespace + "supportedClass",
  ApiDocumentation: hydraNamespace + "ApiDocumentation",
  EntryPoint: hydraNamespace + "EntryPoint",

  mapping: hydraNamespace + "mapping",
  template: hydraNamespace + "template",
  variable: hydraNamespace + "variable",
  variableRepresentation: hydraNamespace + "variableRepresentation",
  property: hydraNamespace + "property",
  BasicRepresentation: hydraNamespace + "BasicRepresentation",
  IriTemplate: hydraNamespace + "IriTemplate",
  IriTemplateMapping: hydraNamespace + "IriTemplateMapping",
  TemplatedLink: hydraNamespace + "TemplatedLink",
  Link: hydraNamespace + "Link",

  member: hydraNamespace + "member",
  memberTemplate: hydraNamespace + "memberTemplate",
  totalItems: hydraNamespace + "totalItems",
  Collection: hydraNamespace + "Collection",

  supportedOperation: hydraNamespace + "supportedOperation",
  supportedProperty: hydraNamespace + "supportedProperty",
  readonly: hydraNamespace + "readonly",
  required: hydraNamespace + "required",
  writeonly: hydraNamespace + "writeonly",
  Class: hydraNamespace + "Class",
  SupportedProperty: hydraNamespace + "SupportedProperty",

  method: hydraNamespace + "method",
  expects: hydraNamespace + "expects",
  returns: hydraNamespace + "returns",
  Operation: hydraNamespace + "Operation",

  operation: hydraNamespace + "operation",
  Resource: hydraNamespace + "Resource",

  first: hydraNamespace + "first",
  next: hydraNamespace + "next",
  previous: hydraNamespace + "previous",
  last: hydraNamespace + "last",
  search: hydraNamespace + "search",
  view: hydraNamespace + "view"
};

const rdfNamespace = "http://www.w3.org/1999/02/22-rdf-syntax-ns#";
export let rdf = {
  namespace: rdfNamespace,

  Property: rdfNamespace + "Property"
};

const rdfsNamespace = "http://www.w3.org/2000/01/rdf-schema#";
export let rdfs = {
  namespace: rdfsNamespace,

  comment: rdfsNamespace + "comment",
  domain: rdfsNamespace + "domain",
  label: rdfsNamespace + "label",
  range: rdfsNamespace + "range"
};
