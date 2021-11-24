import { setPermission } from './yaml';
import {
    organizationSelect,
    organizationMemberSelect
} from './schemas/organization';

import {
    userSelect,
} from './schemas/user';

import {
    projectSelect,
    projectMemberSelect,
    taskSelect,
    taskAssigneeSelect,
    subTaskSelect,
    subTaskAssigneeSelect,
} from './schemas/project';


export const setPermissions = () => {
    setPermission('OrganizationMember', 'select', 'user', organizationMemberSelect);
    setPermission('Organization', 'select', 'user', organizationSelect);
    setPermission('User', 'select', 'user', userSelect);
    setPermission('Project', 'select', 'user', projectSelect);
    setPermission('ProjectMember', 'select', 'user', projectMemberSelect);
    setPermission('Task', 'select', 'user', taskSelect);
    setPermission('TaskAssignee', 'select', 'user', taskAssigneeSelect);
    setPermission('SubTask', 'select', 'user', subTaskSelect);
    setPermission('SubTaskAssignee', 'select', 'user', subTaskAssigneeSelect);
}
