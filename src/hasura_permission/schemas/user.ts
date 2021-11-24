import { me } from './common'
import { myOrganization } from './organization'

export const userSelect = {
    _or: [
        { id: me.user_id },
        { OrganizationMembers: myOrganization },
    ],
};
