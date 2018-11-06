export interface PushData {
  type: string; // Push event type

  owner: string; // Person who fired the action
  action: string; // Action fired
  verb: string; // Verb to display

  companyId: number; // Company where action happened
  moduleId: number; // Module where action happened

  element: string; // Id of the element
  modifiedType: string; // Type of element
  modifiedName: string; // Name of the element
}
