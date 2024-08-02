import type { Schema, Attribute } from '@strapi/strapi';

export interface AdminPermission extends Schema.CollectionType {
  collectionName: 'admin_permissions';
  info: {
    name: 'Permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    actionParameters: Attribute.JSON & Attribute.DefaultTo<{}>;
    subject: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    properties: Attribute.JSON & Attribute.DefaultTo<{}>;
    conditions: Attribute.JSON & Attribute.DefaultTo<[]>;
    role: Attribute.Relation<'admin::permission', 'manyToOne', 'admin::role'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminUser extends Schema.CollectionType {
  collectionName: 'admin_users';
  info: {
    name: 'User';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    firstname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    username: Attribute.String;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.Private &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    registrationToken: Attribute.String & Attribute.Private;
    isActive: Attribute.Boolean &
      Attribute.Private &
      Attribute.DefaultTo<false>;
    roles: Attribute.Relation<'admin::user', 'manyToMany', 'admin::role'> &
      Attribute.Private;
    blocked: Attribute.Boolean & Attribute.Private & Attribute.DefaultTo<false>;
    preferedLanguage: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminRole extends Schema.CollectionType {
  collectionName: 'admin_roles';
  info: {
    name: 'Role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    code: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String;
    users: Attribute.Relation<'admin::role', 'manyToMany', 'admin::user'>;
    permissions: Attribute.Relation<
      'admin::role',
      'oneToMany',
      'admin::permission'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminApiToken extends Schema.CollectionType {
  collectionName: 'strapi_api_tokens';
  info: {
    name: 'Api Token';
    singularName: 'api-token';
    pluralName: 'api-tokens';
    displayName: 'Api Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    type: Attribute.Enumeration<['read-only', 'full-access', 'custom']> &
      Attribute.Required &
      Attribute.DefaultTo<'read-only'>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::api-token',
      'oneToMany',
      'admin::api-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminApiTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_api_token_permissions';
  info: {
    name: 'API Token Permission';
    description: '';
    singularName: 'api-token-permission';
    pluralName: 'api-token-permissions';
    displayName: 'API Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::api-token-permission',
      'manyToOne',
      'admin::api-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferToken extends Schema.CollectionType {
  collectionName: 'strapi_transfer_tokens';
  info: {
    name: 'Transfer Token';
    singularName: 'transfer-token';
    pluralName: 'transfer-tokens';
    displayName: 'Transfer Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::transfer-token',
      'oneToMany',
      'admin::transfer-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_transfer_token_permissions';
  info: {
    name: 'Transfer Token Permission';
    description: '';
    singularName: 'transfer-token-permission';
    pluralName: 'transfer-token-permissions';
    displayName: 'Transfer Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::transfer-token-permission',
      'manyToOne',
      'admin::transfer-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFile extends Schema.CollectionType {
  collectionName: 'files';
  info: {
    singularName: 'file';
    pluralName: 'files';
    displayName: 'File';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    alternativeText: Attribute.String;
    caption: Attribute.String;
    width: Attribute.Integer;
    height: Attribute.Integer;
    formats: Attribute.JSON;
    hash: Attribute.String & Attribute.Required;
    ext: Attribute.String;
    mime: Attribute.String & Attribute.Required;
    size: Attribute.Decimal & Attribute.Required;
    url: Attribute.String & Attribute.Required;
    previewUrl: Attribute.String;
    provider: Attribute.String & Attribute.Required;
    provider_metadata: Attribute.JSON;
    related: Attribute.Relation<'plugin::upload.file', 'morphToMany'>;
    folder: Attribute.Relation<
      'plugin::upload.file',
      'manyToOne',
      'plugin::upload.folder'
    > &
      Attribute.Private;
    folderPath: Attribute.String &
      Attribute.Required &
      Attribute.Private &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFolder extends Schema.CollectionType {
  collectionName: 'upload_folders';
  info: {
    singularName: 'folder';
    pluralName: 'folders';
    displayName: 'Folder';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    pathId: Attribute.Integer & Attribute.Required & Attribute.Unique;
    parent: Attribute.Relation<
      'plugin::upload.folder',
      'manyToOne',
      'plugin::upload.folder'
    >;
    children: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.folder'
    >;
    files: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.file'
    >;
    path: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginContentReleasesRelease extends Schema.CollectionType {
  collectionName: 'strapi_releases';
  info: {
    singularName: 'release';
    pluralName: 'releases';
    displayName: 'Release';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    releasedAt: Attribute.DateTime;
    scheduledAt: Attribute.DateTime;
    timezone: Attribute.String;
    status: Attribute.Enumeration<
      ['ready', 'blocked', 'failed', 'done', 'empty']
    > &
      Attribute.Required;
    actions: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToMany',
      'plugin::content-releases.release-action'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginContentReleasesReleaseAction
  extends Schema.CollectionType {
  collectionName: 'strapi_release_actions';
  info: {
    singularName: 'release-action';
    pluralName: 'release-actions';
    displayName: 'Release Action';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    type: Attribute.Enumeration<['publish', 'unpublish']> & Attribute.Required;
    entry: Attribute.Relation<
      'plugin::content-releases.release-action',
      'morphToOne'
    >;
    contentType: Attribute.String & Attribute.Required;
    locale: Attribute.String;
    release: Attribute.Relation<
      'plugin::content-releases.release-action',
      'manyToOne',
      'plugin::content-releases.release'
    >;
    isEntryValid: Attribute.Boolean;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginI18NLocale extends Schema.CollectionType {
  collectionName: 'i18n_locale';
  info: {
    singularName: 'locale';
    pluralName: 'locales';
    collectionName: 'locales';
    displayName: 'Locale';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.SetMinMax<
        {
          min: 1;
          max: 50;
        },
        number
      >;
    code: Attribute.String & Attribute.Unique;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsPermission
  extends Schema.CollectionType {
  collectionName: 'up_permissions';
  info: {
    name: 'permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String & Attribute.Required;
    role: Attribute.Relation<
      'plugin::users-permissions.permission',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsRole extends Schema.CollectionType {
  collectionName: 'up_roles';
  info: {
    name: 'role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    description: Attribute.String;
    type: Attribute.String & Attribute.Unique;
    permissions: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.permission'
    >;
    users: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsUser extends Schema.CollectionType {
  collectionName: 'up_users';
  info: {
    name: 'user';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  options: {
    draftAndPublish: false;
    timestamps: true;
  };
  attributes: {
    username: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    provider: Attribute.String;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    confirmationToken: Attribute.String & Attribute.Private;
    confirmed: Attribute.Boolean & Attribute.DefaultTo<false>;
    blocked: Attribute.Boolean & Attribute.DefaultTo<false>;
    role: Attribute.Relation<
      'plugin::users-permissions.user',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiActionGestionActionGestion extends Schema.CollectionType {
  collectionName: 'action_gestions';
  info: {
    singularName: 'action-gestion';
    pluralName: 'action-gestions';
    displayName: 'action_gestion';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    recrutement_personnel: Attribute.RichText;
    acquisition_equipement: Attribute.RichText;
    accords_de_partenariats: Attribute.RichText;
    etablissements_organes_directeurs_suivi: Attribute.RichText;
    autres_actions_gestions: Attribute.RichText;
    retards_changements: Attribute.RichText;
    rapport: Attribute.Relation<
      'api::action-gestion.action-gestion',
      'oneToOne',
      'api::rapport.rapport'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::action-gestion.action-gestion',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::action-gestion.action-gestion',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiActivitesEtProduitActivitesEtProduit
  extends Schema.CollectionType {
  collectionName: 'activites_et_produits';
  info: {
    singularName: 'activites-et-produit';
    pluralName: 'activites-et-produits';
    displayName: 'activitesEtProduit';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    produits: Attribute.JSON;
    rapport: Attribute.Relation<
      'api::activites-et-produit.activites-et-produit',
      'oneToOne',
      'api::rapport.rapport'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::activites-et-produit.activites-et-produit',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::activites-et-produit.activites-et-produit',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiAnnexeAnnexe extends Schema.CollectionType {
  collectionName: 'annexes';
  info: {
    singularName: 'annexe';
    pluralName: 'annexes';
    displayName: 'annexe';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    numero: Attribute.Integer;
    titre: Attribute.String;
    type: Attribute.String;
    fichier: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    produit: Attribute.String;
    annexes_projet: Attribute.Relation<
      'api::annexe.annexe',
      'manyToOne',
      'api::annexes-projet.annexes-projet'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::annexe.annexe',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::annexe.annexe',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiAnnexesProjetAnnexesProjet extends Schema.CollectionType {
  collectionName: 'annexes_projets';
  info: {
    singularName: 'annexes-projet';
    pluralName: 'annexes-projets';
    displayName: 'annexes_projet';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    annexes: Attribute.Relation<
      'api::annexes-projet.annexes-projet',
      'oneToMany',
      'api::annexe.annexe'
    >;
    rapport: Attribute.Relation<
      'api::annexes-projet.annexes-projet',
      'oneToOne',
      'api::rapport.rapport'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::annexes-projet.annexes-projet',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::annexes-projet.annexes-projet',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiChangementChangement extends Schema.CollectionType {
  collectionName: 'changements';
  info: {
    singularName: 'changement';
    pluralName: 'changements';
    displayName: 'changement';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    changements_significatifs: Attribute.RichText;
    raisons_changements: Attribute.RichText;
    extension_projet_accepte: Attribute.Boolean;
    justification_extention: Attribute.RichText;
    rapport: Attribute.Relation<
      'api::changement.changement',
      'oneToOne',
      'api::rapport.rapport'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::changement.changement',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::changement.changement',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiContraintesDifficulteContraintesDifficulte
  extends Schema.CollectionType {
  collectionName: 'contraintes_difficultes';
  info: {
    singularName: 'contraintes-difficulte';
    pluralName: 'contraintes-difficultes';
    displayName: 'contraintes_difficulte';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    description: Attribute.RichText;
    rapport: Attribute.Relation<
      'api::contraintes-difficulte.contraintes-difficulte',
      'oneToOne',
      'api::rapport.rapport'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::contraintes-difficulte.contraintes-difficulte',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::contraintes-difficulte.contraintes-difficulte',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCouverturesMediaCouverturesMedia
  extends Schema.CollectionType {
  collectionName: 'couvertures_medias';
  info: {
    singularName: 'couvertures-media';
    pluralName: 'couvertures-medias';
    displayName: 'couvertures_media';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    couvertures: Attribute.JSON;
    rapport: Attribute.Relation<
      'api::couvertures-media.couvertures-media',
      'oneToOne',
      'api::rapport.rapport'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::couvertures-media.couvertures-media',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::couvertures-media.couvertures-media',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiHistoireHistoire extends Schema.CollectionType {
  collectionName: 'histoires';
  info: {
    singularName: 'histoire';
    pluralName: 'histoires';
    displayName: 'histoire';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    titre: Attribute.String;
    type: Attribute.String;
    contenu: Attribute.RichText;
    photo: Attribute.Media<'images'>;
    rapport: Attribute.Relation<
      'api::histoire.histoire',
      'oneToOne',
      'api::rapport.rapport'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::histoire.histoire',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::histoire.histoire',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiProjetProjet extends Schema.CollectionType {
  collectionName: 'projets';
  info: {
    singularName: 'projet';
    pluralName: 'projets';
    displayName: 'projet';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    nom: Attribute.String;
    numero: Attribute.String;
    type: Attribute.String;
    date_debut: Attribute.Date;
    date_fin: Attribute.Date;
    prolonge: Attribute.Boolean;
    agence_mise_en_oeuvre: Attribute.String;
    groupes_cibles_beneficiaires: Attribute.JSON;
    partenaires: Attribute.JSON;
    rapports: Attribute.Relation<
      'api::projet.projet',
      'oneToMany',
      'api::rapport.rapport'
    >;
    lieu_mise_en_oeuvre: Attribute.Enumeration<
      ['national', 'provincial', 'territorial']
    >;
    provinces: Attribute.JSON;
    territoires: Attribute.JSON;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::projet.projet',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::projet.projet',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiRapportRapport extends Schema.CollectionType {
  collectionName: 'rapports';
  info: {
    singularName: 'rapport';
    pluralName: 'rapports';
    displayName: 'rapport';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    type: Attribute.Enumeration<['mi_parcours', 'final']>;
    date: Attribute.Date;
    projet: Attribute.Relation<
      'api::rapport.rapport',
      'manyToOne',
      'api::projet.projet'
    >;
    situation_financiere: Attribute.Relation<
      'api::rapport.rapport',
      'oneToOne',
      'api::situation-financiere.situation-financiere'
    >;
    action_gestion: Attribute.Relation<
      'api::rapport.rapport',
      'oneToOne',
      'api::action-gestion.action-gestion'
    >;
    reference: Attribute.Relation<
      'api::rapport.rapport',
      'oneToOne',
      'api::reference.reference'
    >;
    activites_et_produit: Attribute.Relation<
      'api::rapport.rapport',
      'oneToOne',
      'api::activites-et-produit.activites-et-produit'
    >;
    resultat: Attribute.Relation<
      'api::rapport.rapport',
      'oneToOne',
      'api::resultat.resultat'
    >;
    changement: Attribute.Relation<
      'api::rapport.rapport',
      'oneToOne',
      'api::changement.changement'
    >;
    contraintes_difficulte: Attribute.Relation<
      'api::rapport.rapport',
      'oneToOne',
      'api::contraintes-difficulte.contraintes-difficulte'
    >;
    success_accomplissement: Attribute.Relation<
      'api::rapport.rapport',
      'oneToOne',
      'api::success-accomplissement.success-accomplissement'
    >;
    couvertures_media: Attribute.Relation<
      'api::rapport.rapport',
      'oneToOne',
      'api::couvertures-media.couvertures-media'
    >;
    histoire: Attribute.Relation<
      'api::rapport.rapport',
      'oneToOne',
      'api::histoire.histoire'
    >;
    remarque: Attribute.Relation<
      'api::rapport.rapport',
      'oneToOne',
      'api::remarque.remarque'
    >;
    annexes_projet: Attribute.Relation<
      'api::rapport.rapport',
      'oneToOne',
      'api::annexes-projet.annexes-projet'
    >;
    signature: Attribute.Relation<
      'api::rapport.rapport',
      'oneToOne',
      'api::signature.signature'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::rapport.rapport',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::rapport.rapport',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiReferenceReference extends Schema.CollectionType {
  collectionName: 'references';
  info: {
    singularName: 'reference';
    pluralName: 'references';
    displayName: 'reference';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    donnees: Attribute.JSON;
    methodes: Attribute.RichText;
    rapport: Attribute.Relation<
      'api::reference.reference',
      'oneToOne',
      'api::rapport.rapport'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::reference.reference',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::reference.reference',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiRemarqueRemarque extends Schema.CollectionType {
  collectionName: 'remarques';
  info: {
    singularName: 'remarque';
    pluralName: 'remarques';
    displayName: 'remarque';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    remarques: Attribute.JSON;
    rapport: Attribute.Relation<
      'api::remarque.remarque',
      'oneToOne',
      'api::rapport.rapport'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::remarque.remarque',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::remarque.remarque',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiResultatResultat extends Schema.CollectionType {
  collectionName: 'resultats';
  info: {
    singularName: 'resultat';
    pluralName: 'resultats';
    displayName: 'resultat';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    type_rapport: Attribute.Enumeration<['mi-parcours', 'final']>;
    resultats: Attribute.JSON;
    rapport: Attribute.Relation<
      'api::resultat.resultat',
      'oneToOne',
      'api::rapport.rapport'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::resultat.resultat',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::resultat.resultat',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiSignatureSignature extends Schema.CollectionType {
  collectionName: 'signatures';
  info: {
    singularName: 'signature';
    pluralName: 'signatures';
    displayName: 'signature';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    nom: Attribute.String;
    poste: Attribute.String;
    objection: Attribute.Boolean;
    rapport: Attribute.Relation<
      'api::signature.signature',
      'oneToOne',
      'api::rapport.rapport'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::signature.signature',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::signature.signature',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiSituationFinanciereSituationFinanciere
  extends Schema.CollectionType {
  collectionName: 'situation_financieres';
  info: {
    singularName: 'situation-financiere';
    pluralName: 'situation-financieres';
    displayName: 'situation_financiere';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    montant_total: Attribute.Decimal;
    fond_recus: Attribute.Decimal;
    fond_utilises: Attribute.Decimal;
    cofinancement: Attribute.Decimal;
    commentaires: Attribute.RichText;
    rapport: Attribute.Relation<
      'api::situation-financiere.situation-financiere',
      'oneToOne',
      'api::rapport.rapport'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::situation-financiere.situation-financiere',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::situation-financiere.situation-financiere',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiSuccessAccomplissementSuccessAccomplissement
  extends Schema.CollectionType {
  collectionName: 'success_accomplissements';
  info: {
    singularName: 'success-accomplissement';
    pluralName: 'success-accomplissements';
    displayName: 'success_accomplissement';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    description: Attribute.RichText;
    rapport: Attribute.Relation<
      'api::success-accomplissement.success-accomplissement',
      'oneToOne',
      'api::rapport.rapport'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::success-accomplissement.success-accomplissement',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::success-accomplissement.success-accomplissement',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface ContentTypes {
      'admin::permission': AdminPermission;
      'admin::user': AdminUser;
      'admin::role': AdminRole;
      'admin::api-token': AdminApiToken;
      'admin::api-token-permission': AdminApiTokenPermission;
      'admin::transfer-token': AdminTransferToken;
      'admin::transfer-token-permission': AdminTransferTokenPermission;
      'plugin::upload.file': PluginUploadFile;
      'plugin::upload.folder': PluginUploadFolder;
      'plugin::content-releases.release': PluginContentReleasesRelease;
      'plugin::content-releases.release-action': PluginContentReleasesReleaseAction;
      'plugin::i18n.locale': PluginI18NLocale;
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
      'plugin::users-permissions.role': PluginUsersPermissionsRole;
      'plugin::users-permissions.user': PluginUsersPermissionsUser;
      'api::action-gestion.action-gestion': ApiActionGestionActionGestion;
      'api::activites-et-produit.activites-et-produit': ApiActivitesEtProduitActivitesEtProduit;
      'api::annexe.annexe': ApiAnnexeAnnexe;
      'api::annexes-projet.annexes-projet': ApiAnnexesProjetAnnexesProjet;
      'api::changement.changement': ApiChangementChangement;
      'api::contraintes-difficulte.contraintes-difficulte': ApiContraintesDifficulteContraintesDifficulte;
      'api::couvertures-media.couvertures-media': ApiCouverturesMediaCouverturesMedia;
      'api::histoire.histoire': ApiHistoireHistoire;
      'api::projet.projet': ApiProjetProjet;
      'api::rapport.rapport': ApiRapportRapport;
      'api::reference.reference': ApiReferenceReference;
      'api::remarque.remarque': ApiRemarqueRemarque;
      'api::resultat.resultat': ApiResultatResultat;
      'api::signature.signature': ApiSignatureSignature;
      'api::situation-financiere.situation-financiere': ApiSituationFinanciereSituationFinanciere;
      'api::success-accomplissement.success-accomplissement': ApiSuccessAccomplissementSuccessAccomplissement;
    }
  }
}
