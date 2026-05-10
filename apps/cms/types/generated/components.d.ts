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
    vk: Schema.Attribute.String;
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

export interface FestivalFaqItem extends Struct.ComponentSchema {
  collectionName: 'components_festival_faq_items';
  info: {
    displayName: 'FAQ Item';
    icon: 'question';
  };
  attributes: {
    answer: Schema.Attribute.Text & Schema.Attribute.Required;
    question: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface FestivalStatItem extends Struct.ComponentSchema {
  collectionName: 'components_festival_stat_items';
  info: {
    displayName: 'Stat Item';
    icon: 'chart-bar';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    value: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface FooterDocument extends Struct.ComponentSchema {
  collectionName: 'components_footer_documents';
  info: {
    displayName: 'Document';
  };
  attributes: {
    file: Schema.Attribute.Media<'files'> & Schema.Attribute.Required;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 120;
      }>;
  };
}

export interface FooterSocial extends Struct.ComponentSchema {
  collectionName: 'components_footer_socials';
  info: {
    displayName: 'Social Link';
  };
  attributes: {
    platform: Schema.Attribute.Enumeration<['vk', 'telegram', 'max', 'dzen']> &
      Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'common.contact': CommonContact;
      'event.ticket': EventTicket;
      'festival.faq-item': FestivalFaqItem;
      'festival.stat-item': FestivalStatItem;
      'footer.document': FooterDocument;
      'footer.social': FooterSocial;
    }
  }
}
