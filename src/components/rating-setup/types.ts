
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

export interface BaseItem {
  id: string;
  name: string;
  score: number;
  type: 'group' | 'rule';
}

export interface Rule extends BaseItem {
  type: 'rule';
}

export interface Group extends BaseItem {
  type: 'group';
  items: (Group | Rule)[];
  isOpen?: boolean;
}

export interface RuleItemProps {
  rule: Rule;
  onRemove: (id: string) => void;
  onScoreChange: (id: string, score: number) => void;
  onEdit: (id: string) => void;
}

export interface GroupItemProps {
  group: Group;
  onRemove: (id: string) => void;
  onScoreChange: (id: string, score: number) => void;
  onEdit: (id: string) => void;
  onAddGroup: (parentId: string) => void;
  onAddRule: (parentId: string) => void;
  onToggle: (id: string) => void;
}

export interface ScoreBuilderProps {
  onAddGroup: () => void;
  onAddRule: () => void;
}
