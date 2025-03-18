export interface SelectOption {
  value: string;
  label: string;
}

export interface BranchFormData {
  branchName: string;
  conditions: Condition[];
}

export interface Condition {
  field: string;
  operator: string;
  value: string;
}

export interface HeaderProps {
  onSaveDraft: () => void;
  onPublish: () => void;
}

export interface SidebarProps {
  onOrganizationChange: (org: string) => void;
  onWorkflowChange: (workflow: string) => void;
  onVersionChange: (version: string) => void;
}

export interface BranchFormProps {
  onSubmit: (data: BranchFormData) => void;
}

export interface ConditionBuilderProps {
  conditions: Condition[];
  onAddCondition: () => void;
  onRemoveCondition: (index: number) => void;
  onConditionChange: (index: number, condition: Condition) => void;
}
