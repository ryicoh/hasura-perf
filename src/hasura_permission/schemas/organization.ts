import { me } from './common'

export const myOrganization = {
    Organization: {
        OrganizationMembers: me
    },
};



export const organizationSelect = myOrganization.Organization;
export const organizationMemberSelect = myOrganization;

