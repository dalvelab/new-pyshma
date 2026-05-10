import type { Schema, Struct } from '@strapi/strapi';

export interface CommonContact extends Struct.ComponentSchema {
  collectionName: 'components_common_contacts';
  info: {
    displayName: 'Contact';
    icon: 'envelope';
  };
  attributes: {
    email: Schema.Attribute.Email;
    phone: Schema.Attribute.String;
    telegram: Schema.Attribute.String;
  };
}

export interface EventTicket extends Struct.ComponentSchema {
  collectionName: 'components_event_tickets';
  info: {
    displayName: 'Ticket';
    icon: 'ticket';
  };
  attributes: {
    date: Schema.Attribute.DateTime & Schema.Attribute.Required;
    link: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'common.contact': CommonContact;
      'event.ticket': EventTicket;
    }
  }
}
