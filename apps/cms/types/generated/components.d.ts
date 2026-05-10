import type { Schema, Struct } from '@strapi/strapi';

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
      'event.ticket': EventTicket;
    }
  }
}
