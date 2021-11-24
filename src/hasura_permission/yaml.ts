import fs from 'fs';
import YAML from 'yaml';

export const fileName = 'metadata/tables.yaml';

let readTables: any;

type TableName = 'Organization' | 'User' | 'OrganizationMember' | 'Project' | 'ProjectMember' |
    'SubTask' | 'SubTaskAssignee' | 'Task' |
    'TaskAssignee'

type Action = 'select' | 'insert' | 'update' | 'delete'
type Role = 'user'

const yamlOption = {
    maxAliasCount: 100000,
};

export const getPermission = (tableName: TableName, action: Action, role: Role): any => {
    if (!readTables) {
        const file = fs.readFileSync(fileName, 'utf8');
        readTables = YAML.parse(file, yamlOption);
    }

    const table = readTables.find((t: { table: { name: string } }) => t.table.name === tableName);

    switch (action) {
        case 'select':
            return table.select_permissions.find((p: { role: string }) => p.role === role)?.permission.filter;
        case 'insert':
            return table.insert_permissions.find((p: { role: string }) => p.role === role)?.permission.check;
        case 'update':
            return table.update_permissions.find((p: { role: string }) => p.role === role)?.permission.filter;
        default:
            return {};
    }
};

export const setPermission = (tableName: TableName, action: Action, role: Role, permission: any): void => {
    const file = fs.readFileSync(fileName, 'utf8');
    const tables = YAML.parse(file, yamlOption);

    const tableIndex = tables.findIndex((t: { table: { name: string } }) => t.table.name === tableName);
    const table = tables[tableIndex];

    switch (action) {
        case 'select': {
            const roleIndex = table.select_permissions.findIndex((p: { role: string }) => p.role === role);
            if (roleIndex === -1) {
                throw new Error(`role(${role}) does not have the permission for ${tableName}.${action}`);
            }
            table.select_permissions[roleIndex].permission.filter = permission;
            break;
        }
        case 'insert': {
            const roleIndex = table.insert_permissions.findIndex((p: { role: string }) => p.role === role);
            if (roleIndex === -1) {
                throw new Error(`role(${role}) does not have the permission for ${tableName}.${action}`);
            }
            table.insert_permissions[roleIndex].permission.check = permission;
            break;
        }
        case 'update': {
            const roleIndex = table.update_permissions.findIndex((p: { role: string }) => p.role === role);
            if (roleIndex === -1) {
                throw new Error(`role(${role}) does not have the permission for ${tableName}.${action}`);
            }
            table.update_permissions[roleIndex].permission.filter = permission;
            break;
        }
        case 'delete': {
            const roleIndex = table.delete_permissions.findIndex((p: { role: string }) => p.role === role);
            if (roleIndex === -1) {
                throw new Error(`role(${role}) does not have the permission for ${tableName}.${action}`);
            }
            table.delete_permissions[roleIndex].permission.filter = permission;
            break;
        }
        default:
    }

    fs.writeFileSync(fileName, YAML.stringify(tables, { indentSeq: false, keepNodeTypes: false }));
};
