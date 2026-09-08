import type { Schema, Struct } from '@strapi/strapi';

export interface AboutHistoryItem extends Struct.ComponentSchema {
  collectionName: 'components_about_history_items';
  info: {
    description: '\u041A\u0430\u0440\u0442\u043E\u0447\u043A\u0430 \u0431\u043B\u043E\u043A\u0430 \u00AB\u0438\u0441\u0442\u043E\u0440\u0438\u044F\u00BB \u0438 \u043E\u0442\u0434\u0435\u043B\u044C\u043D\u0430\u044F \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0430 /about/history/<slug>';
    displayName: 'History Item';
    icon: 'clock';
  };
  attributes: {
    body: Schema.Attribute.RichText & Schema.Attribute.Required;
    illustration: Schema.Attribute.Enumeration<
      [
        'city',
        'park',
        'pond',
        'stage',
        'crowd',
        'portrait',
        'building',
        'sport',
        'leaf',
        'sun',
        'abstract',
      ]
    > &
      Schema.Attribute.DefaultTo<'building'>;
    image: Schema.Attribute.Media<'images'>;
    pattern: Schema.Attribute.Enumeration<
      ['diag', 'dots', 'cross', 'warm', 'block', 'sun', 'zigzag']
    > &
      Schema.Attribute.DefaultTo<'cross'>;
    slug: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 80;
      }>;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 200;
      }>;
    year: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 20;
      }>;
  };
}

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

export interface FestivalPartner extends Struct.ComponentSchema {
  collectionName: 'components_festival_partners';
  info: {
    displayName: 'Partner';
    icon: 'briefcase';
  };
  attributes: {
    logo: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String;
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
      'about.history-item': AboutHistoryItem;
      'common.contact': CommonContact;
      'event.ticket': EventTicket;
      'festival.faq-item': FestivalFaqItem;
      'festival.partner': FestivalPartner;
      'festival.stat-item': FestivalStatItem;
      'footer.document': FooterDocument;
      'footer.social': FooterSocial;
    }
  }
}
