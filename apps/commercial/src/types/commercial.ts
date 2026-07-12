export type Currency = 'IRR' | 'USD' | 'EUR' | 'AED'
export type SupplierStatus = 'active' | 'inactive' | 'blacklisted' | 'pending'
export type ContractStatus = 'draft' | 'active' | 'expired' | 'terminated' | 'pending-renewal'
export type POStatus = 'draft' | 'pending-approval' | 'approved' | 'shipped' | 'partial' | 'delivered' | 'cancelled'
export type RiskLevel = 'low' | 'medium' | 'high' | 'critical'
export type NegotiationStage = 'preparation' | 'opening' | 'bidding' | 'closing' | 'awarded' | 'failed'

export interface Supplier {
  id: string
  name: string
  code: string
  category: string
  country: string
  city: string
  status: SupplierStatus
  riskScore: number
  riskLevel: RiskLevel
  rating: number
  totalContracts: number
  activeContracts: number
  totalSpend: number
  currency: Currency
  reliability: number
  avgLeadTime: number
  qualityScore: number
  complianceScore: number
  certifications: string[]
  contactPerson: string
  contactEmail: string
  contactPhone: string
  address: string
  bankInfo: string
  paymentTerms: string
  lastEvaluation: string
  notes: string
  lat: number
  lng: number
}

export interface Contract {
  id: string
  title: string
  contractNumber: string
  supplierId: string
  supplierName: string
  category: string
  status: ContractStatus
  type: 'fixed' | 'cost-plus' | 'time-material' | 'framework'
  value: number
  currency: Currency
  startDate: string
  endDate: string
  renewalDate: string
  autoRenew: boolean
  penaltyClause: string
  slaScore: number
  riskFlags: string[]
  totalAmendments: number
  documents: ContractDocument[]
  milestones: ContractMilestone[]
  payments: ContractPayment[]
  notes: string
  createdBy: string
  createdAt: string
}

export interface ContractDocument {
  id: string
  name: string
  type: 'pdf' | 'docx' | 'xlsx' | 'image'
  uploadedAt: string
  uploadedBy: string
  size: number
}

export interface ContractMilestone {
  id: string
  title: string
  dueDate: string
  completedDate: string | null
  status: 'pending' | 'completed' | 'overdue'
  value: number
  description: string
}

export interface ContractPayment {
  id: string
  dueDate: string
  paidDate: string | null
  amount: number
  currency: Currency
  status: 'pending' | 'paid' | 'overdue'
  description: string
}

export interface PurchaseOrder {
  id: string
  poNumber: string
  supplierId: string
  supplierName: string
  category: string
  status: POStatus
  items: POItem[]
  totalAmount: number
  currency: Currency
  requestedDate: string
  expectedDate: string
  deliveredDate: string | null
  shippingMethod: string
  shippingCost: number
  paymentTerms: string
  notes: string
  approvedBy: string | null
  approvedAt: string | null
  createdBy: string
  createdAt: string
  urgency: 'low' | 'normal' | 'high' | 'critical'
}

export interface POItem {
  id: string
  productName: string
  sku: string
  quantity: number
  unit: string
  unitPrice: number
  totalPrice: number
  received: number
  status: 'pending' | 'partial' | 'received'
}

export interface NegotiationSession {
  id: string
  title: string
  supplierId: string
  supplierName: string
  contractId: string | null
  stage: NegotiationStage
  value: number
  currency: Currency
  startDate: string
  targetDate: string
  leadName: string
  teamMembers: string[]
  items: NegotiationItem[]
  timeline: NegotiationEvent[]
  aiInsights: AiInsight[]
  status: 'active' | 'completed' | 'paused' | 'cancelled'
}

export interface NegotiationItem {
  id: string
  label: string
  targetValue: number
  currentOffer: number
  minimumAcceptable: number
  unit: string
  status: 'open' | 'agreed' | 'conceded'
}

export interface NegotiationEvent {
  id: string
  date: string
  type: 'meeting' | 'call' | 'email' | 'offer' | 'counter' | 'milestone'
  title: string
  description: string
  user: string
}

export interface AiInsight {
  id: string
  type: 'opportunity' | 'risk' | 'strategy' | 'benchmark'
  title: string
  description: string
  priority: 'low' | 'medium' | 'high'
  confidenceScore: number
}

export interface SupplyChainNode {
  id: string
  type: 'supplier' | 'warehouse' | 'production' | 'distribution' | 'port'
  name: string
  lat: number
  lng: number
  status: 'operational' | 'disrupted' | 'maintenance'
  riskLevel: RiskLevel
  load: number
  capacity: number
}

export interface SupplyChainRoute {
  id: string
  fromId: string
  toId: string
  type: 'sea' | 'air' | 'land'
  status: 'active' | 'delayed' | 'disrupted'
  transitDays: number
  currentDay: number
  cargoValue: number
  alerts: string[]
}

export interface ProcurementKpi {
  id: string
  label: string
  value: number
  unit: string
  trend: 'up' | 'down' | 'stable'
  changePercentage: number
  changeLabel: string
  icon: string
  color: string
}

export interface ProcurementDashboard {
  kpis: ProcurementKpi[]
  activeContracts: number
  pendingPOs: number
  criticalSuppliers: number
  monthlySpend: number
  savingsYTD: number
  spendByCategory: { category: string; amount: number; percentage: number }[]
  topSuppliers: { id: string; name: string; spent: number; contracts: number }[]
  urgentActions: { id: string; type: string; title: string; priority: 'low' | 'medium' | 'high'; dueDate: string }[]
}
