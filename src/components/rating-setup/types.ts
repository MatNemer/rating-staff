
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
  logicalOperator?: "AND" | "OR";
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
  onAddExpression: () => void;
  onRemoveCondition: (index: number) => void;
  onConditionChange: (index: number, condition: Condition) => void;
}

// New types for group and rule structure
export interface Rule {
  id: string;
  name: string;
  score: number;
}

export interface Group {
  id: string;
  name: string;
  score: number;
  items: (Group | Rule)[];
  expanded?: boolean;
}
