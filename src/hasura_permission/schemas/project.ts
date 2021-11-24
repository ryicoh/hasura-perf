import { me } from './common'
import { myOrganization } from './organization'

export const projectSelect = {
    _or: [
        {
            visibility: { _eq: "Public" }
        },
        {
            visibility: { _eq: "OrganizationMemberOnly" },
            ...myOrganization
        },
        {
            visibility: { _eq: "ProjectMemberOnly" },
            ProjectMembers: me,
        }
    ],
};

export const projectMemberSelect = {
    _or: [
        me,
        {
            Project: {
                _or: [
                    {
                        visibility: { _eq: "Public" },
                    },
                    {
                        visibility: { _eq: "OrganizationMemberOnly" },
                        ...myOrganization
                    },
                ]
            }
        },
    ],
};

export const taskSelect = {
    _or: [
        { Project: projectSelect },
        {
            TaskAssignees: me
        }
    ],
};

export const taskAssigneeSelect = {
    _or: [
        { Task: { Project: projectSelect } },
        me
    ],
};

export const subTaskSelect = {
    _or: [
        { Task: taskSelect },
        {
            SubTaskAssignees: me
        }
    ],
};

export const subTaskAssigneeSelect = {
    _or: [
        { SubTask: { Task: taskSelect } },
        me
    ],
};

