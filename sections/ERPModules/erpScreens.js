// Module-specific dashboard content for the ERP preview, keyed by erpModules id.
// Each screen: sidebar nav, header action, 4 KPIs, a primary and a secondary widget.

const MONTHS = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];

export const erpScreens = {
  1: {
    nav: [['Dashboard', 'grid'], ['Products', 'box'], ['Warehouses', 'layers'], ['Stock Moves', 'swap'], ['Reorders', 'refresh'], ['Reports', 'file']],
    action: 'Add Product',
    kpis: [
      { label: 'Total SKUs', value: '2,481', delta: '+4.2%', tone: 'good', spark: [30, 42, 38, 50, 48, 60, 66] },
      { label: 'Stock Value', value: '$1.24M', delta: '+8.1%', tone: 'good', spark: [40, 38, 52, 49, 58, 62, 74] },
      { label: 'Low Stock', value: '23', delta: '-12%', tone: 'good', spark: [70, 64, 60, 52, 48, 40, 34] },
      { label: 'Warehouses', value: '4', delta: 'All active', tone: 'neutral', spark: [50, 50, 52, 50, 51, 50, 52] },
    ],
    primary: {
      type: 'progress',
      title: 'Stock Levels',
      meta: 'Live',
      items: [
        { title: 'Wireless Mouse M240', sub: 'SKU-1042 · Mumbai', value: 82, right: '1,640 units', tone: 'ok' },
        { title: 'USB-C Hub 7-in-1', sub: 'SKU-2210 · Delhi', value: 18, right: '92 units', tone: 'low' },
        { title: 'Ergo Office Chair', sub: 'SKU-0871 · Pune', value: 64, right: '318 units', tone: 'ok' },
        { title: 'Aluminium Laptop Stand', sub: 'SKU-3315 · Mumbai', value: 8, right: '14 units', tone: 'critical' },
        { title: '27" 4K Monitor', sub: 'SKU-5520 · Bengaluru', value: 47, right: '236 units', tone: 'ok' },
      ],
    },
    secondary: {
      type: 'donut',
      title: 'By Warehouse',
      center: ['2,481', 'SKUs'],
      segments: [
        { label: 'Mumbai', value: 38 },
        { label: 'Delhi', value: 27 },
        { label: 'Pune', value: 21 },
        { label: 'Bengaluru', value: 14 },
      ],
    },
  },

  2: {
    nav: [['Overview', 'grid'], ['General Ledger', 'book'], ['Invoices', 'file'], ['Payables', 'arrowUp'], ['Receivables', 'arrowDown'], ['Tax', 'percent']],
    action: 'New Invoice',
    kpis: [
      { label: 'Revenue', value: '$842K', delta: '+12.4%', tone: 'good', spark: [30, 40, 36, 52, 58, 64, 72] },
      { label: 'Expenses', value: '$516K', delta: '+3.1%', tone: 'neutral', spark: [44, 46, 45, 50, 48, 52, 53] },
      { label: 'Net Profit', value: '$326K', delta: '+18.9%', tone: 'good', spark: [20, 28, 30, 42, 50, 56, 70] },
      { label: 'Cash Balance', value: '$1.9M', delta: '+6.2%', tone: 'good', spark: [50, 54, 52, 58, 60, 63, 66] },
    ],
    primary: {
      type: 'area',
      title: 'Revenue vs Expenses',
      meta: 'FY 2026',
      labels: MONTHS,
      series: [
        { name: 'Revenue', values: [52, 58, 55, 64, 70, 68, 76, 80, 78, 86, 92, 98] },
        { name: 'Expenses', values: [40, 42, 44, 45, 48, 47, 50, 52, 51, 54, 55, 57], muted: true },
      ],
    },
    secondary: {
      type: 'list',
      title: 'Recent Invoices',
      items: [
        { badge: 'NX', title: 'Nexa Corp', sub: 'INV-2041', value: '$12,400', status: ['Paid', 'good'] },
        { badge: 'OR', title: 'Orbit Ltd', sub: 'INV-2042', value: '$8,900', status: ['Overdue', 'bad'] },
        { badge: 'ZN', title: 'Zenith Co', sub: 'INV-2043', value: '$21,100', status: ['Pending', 'warn'] },
        { badge: 'AP', title: 'Apex Inc', sub: 'INV-2044', value: '$4,750', status: ['Paid', 'good'] },
      ],
    },
  },

  3: {
    nav: [['Dashboard', 'grid'], ['Employees', 'users'], ['Attendance', 'clock'], ['Payroll', 'wallet'], ['Leave', 'calendar'], ['Reviews', 'star']],
    action: 'Add Employee',
    kpis: [
      { label: 'Employees', value: '486', delta: '+12 this month', tone: 'good', spark: [40, 44, 46, 50, 54, 58, 62] },
      { label: 'Present Today', value: '447', delta: '92%', tone: 'good', spark: [60, 72, 68, 75, 70, 78, 74] },
      { label: 'On Leave', value: '18', delta: '6 pending', tone: 'neutral', spark: [30, 26, 34, 28, 32, 24, 30] },
      { label: 'Open Roles', value: '9', delta: '3 in final round', tone: 'neutral', spark: [50, 46, 52, 44, 40, 42, 38] },
    ],
    primary: {
      type: 'list',
      title: 'Team Members',
      meta: '486 total',
      people: true,
      items: [
        { badge: 'PS', title: 'Priya Sharma', sub: 'Frontend Engineer · Engineering', status: ['Present', 'good'] },
        { badge: 'RV', title: 'Rahul Verma', sub: 'HR Manager · People Ops', status: ['Remote', 'info'] },
        { badge: 'AI', title: 'Ananya Iyer', sub: 'Product Designer · Design', status: ['On Leave', 'warn'] },
        { badge: 'KM', title: 'Karan Mehta', sub: 'DevOps Engineer · Engineering', status: ['Present', 'good'] },
        { badge: 'SK', title: 'Sneha Kapoor', sub: 'Senior Accountant · Finance', status: ['Present', 'good'] },
      ],
    },
    secondary: {
      type: 'donut',
      title: 'By Department',
      center: ['486', 'People'],
      segments: [
        { label: 'Engineering', value: 42 },
        { label: 'Sales', value: 23 },
        { label: 'Operations', value: 20 },
        { label: 'HR & Admin', value: 15 },
      ],
    },
  },

  4: {
    nav: [['Overview', 'grid'], ['Purchase Orders', 'file'], ['Vendors', 'building'], ['Approvals', 'check'], ['RFQs', 'mail'], ['Spend Analytics', 'pie']],
    action: 'New PO',
    kpis: [
      { label: 'Open POs', value: '128', delta: '+9 today', tone: 'neutral', spark: [40, 48, 44, 52, 50, 58, 60] },
      { label: 'Spend (MTD)', value: '$284K', delta: '-4.6% vs plan', tone: 'good', spark: [20, 34, 42, 50, 58, 64, 70] },
      { label: 'Awaiting Approval', value: '14', delta: '3 urgent', tone: 'bad', spark: [30, 36, 34, 42, 38, 46, 44] },
      { label: 'Avg Lead Time', value: '4.2d', delta: '-0.8d', tone: 'good', spark: [70, 66, 62, 58, 54, 50, 46] },
    ],
    primary: {
      type: 'kanban',
      title: 'PO Pipeline',
      meta: 'This week',
      stages: [
        { label: 'Draft', count: 24, cards: [['PO-5512', 'Steel Works', '$4.2K'], ['PO-5515', 'PackRight', '$1.8K']] },
        { label: 'Approval', count: 14, cards: [['PO-5498', 'TechParts', '$12.6K'], ['PO-5501', 'OfficeHub', '$3.4K']] },
        { label: 'Ordered', count: 56, cards: [['PO-5470', 'Global Chem', '$22.1K'], ['PO-5482', 'Steel Works', '$9.8K']] },
        { label: 'Received', count: 34, cards: [['PO-5441', 'TechParts', '$7.5K'], ['PO-5452', 'PackRight', '$2.9K']] },
      ],
    },
    secondary: {
      type: 'progress',
      title: 'Top Vendors by Spend',
      compact: true,
      items: [
        { title: 'Global Chem', value: 86, right: '$92K', tone: 'ok' },
        { title: 'Steel Works', value: 64, right: '$68K', tone: 'ok' },
        { title: 'TechParts', value: 48, right: '$51K', tone: 'ok' },
        { title: 'PackRight', value: 30, right: '$32K', tone: 'ok' },
        { title: 'OfficeHub', value: 18, right: '$19K', tone: 'ok' },
      ],
    },
  },

  5: {
    nav: [['Dashboard', 'grid'], ['Quotations', 'file'], ['Sales Orders', 'cart'], ['Invoicing', 'receipt'], ['Customers', 'users'], ['Analytics', 'trending']],
    action: 'New Quote',
    kpis: [
      { label: 'Revenue', value: '$1.48M', delta: '+15.2%', tone: 'good', spark: [30, 38, 44, 50, 56, 66, 74] },
      { label: 'Orders', value: '3,240', delta: '+9.8%', tone: 'good', spark: [40, 46, 44, 52, 58, 60, 68] },
      { label: 'Avg Order', value: '$457', delta: '+4.1%', tone: 'good', spark: [50, 48, 54, 52, 58, 56, 60] },
      { label: 'Win Rate', value: '38%', delta: '+2.4 pts', tone: 'good', spark: [30, 32, 34, 33, 36, 37, 40] },
    ],
    primary: {
      type: 'bars',
      title: 'Monthly Sales vs Target',
      meta: 'Target $120K',
      labels: MONTHS,
      values: [62, 70, 58, 76, 82, 74, 88, 92, 80, 95, 86, 72],
      target: 78,
      highlight: 9,
    },
    secondary: {
      type: 'list',
      title: 'Top Customers',
      items: [
        { badge: 'BL', title: 'Bluewave Retail', sub: '142 orders', value: '$184K' },
        { badge: 'MT', title: 'Metro Traders', sub: '98 orders', value: '$126K' },
        { badge: 'SN', title: 'Sunrise Foods', sub: '87 orders', value: '$98K' },
        { badge: 'KR', title: 'Krystal Pharma', sub: '64 orders', value: '$76K' },
      ],
    },
  },

  6: {
    nav: [['Overview', 'grid'], ['Work Orders', 'clipboard'], ['Bill of Materials', 'layers'], ['Production', 'factory'], ['Quality Control', 'shield'], ['Machines', 'settings']],
    action: 'New Work Order',
    kpis: [
      { label: 'Units Today', value: '1,842', delta: '+6.4%', tone: 'good', spark: [30, 44, 40, 56, 62, 58, 70] },
      { label: 'Active Lines', value: '6 / 8', delta: '2 in maintenance', tone: 'neutral', spark: [60, 62, 60, 58, 60, 56, 58] },
      { label: 'Scrap Rate', value: '1.2%', delta: '-0.3 pts', tone: 'good', spark: [60, 54, 56, 48, 44, 40, 36] },
      { label: 'QC Pass', value: '98.6%', delta: '+0.4 pts', tone: 'good', spark: [70, 72, 71, 74, 76, 75, 78] },
    ],
    primary: {
      type: 'progress',
      title: 'Work Orders in Production',
      meta: '5 running',
      items: [
        { title: 'WO-3381 · Steel Bracket A2', sub: 'Line 1 · 720 / 1,000 pcs', value: 72, right: '72%', tone: 'ok' },
        { title: 'WO-3382 · Motor Housing', sub: 'Line 3 · 225 / 500 pcs', value: 45, right: '45%', tone: 'ok' },
        { title: 'WO-3383 · Gear Assembly', sub: 'Line 2 · 910 / 1,000 pcs', value: 91, right: '91%', tone: 'ok' },
        { title: 'WO-3384 · Control Panel', sub: 'Line 5 · Material shortage', value: 23, right: 'Blocked', tone: 'critical' },
        { title: 'WO-3385 · Valve Body', sub: 'Line 4 · 360 / 600 pcs', value: 60, right: '60%', tone: 'ok' },
      ],
    },
    secondary: {
      type: 'gauge',
      title: 'Overall Equipment Effectiveness',
      value: 87,
      label: 'OEE',
      stats: [['Availability', '94%'], ['Performance', '96%'], ['Quality', '98.6%']],
    },
  },

  7: {
    nav: [['Overview', 'grid'], ['Shipments', 'truck'], ['Logistics', 'route'], ['Suppliers', 'building'], ['Warehouses', 'layers'], ['Live Tracking', 'pin']],
    action: 'Track Shipment',
    kpis: [
      { label: 'In Transit', value: '64', delta: '+8 today', tone: 'neutral', spark: [40, 46, 50, 48, 56, 60, 64] },
      { label: 'On-Time Delivery', value: '96.2%', delta: '+1.8 pts', tone: 'good', spark: [60, 64, 62, 68, 70, 72, 76] },
      { label: 'Delayed', value: '3', delta: 'Weather · Customs', tone: 'bad', spark: [30, 24, 36, 28, 22, 30, 26] },
      { label: 'Avg Transit', value: '2.8d', delta: '-0.4d', tone: 'good', spark: [70, 66, 64, 60, 58, 54, 50] },
    ],
    primary: {
      type: 'timeline',
      title: 'Live Shipments',
      meta: 'Updated 2 min ago',
      steps: ['Picked', 'In Transit', 'Hub', 'Delivered'],
      shipments: [
        { id: 'SHP-7781', route: 'Mumbai → Delhi', step: 1, eta: 'ETA 6h', status: ['On Time', 'good'] },
        { id: 'SHP-7782', route: 'Chennai → Pune', step: 2, eta: 'ETA 2h', status: ['On Time', 'good'] },
        { id: 'SHP-7783', route: 'Shanghai → Mumbai', step: 1, eta: 'ETA 3d', status: ['Customs', 'warn'] },
        { id: 'SHP-7784', route: 'Delhi → Jaipur', step: 3, eta: 'Delivered 09:12', status: ['Delivered', 'info'] },
      ],
    },
    secondary: {
      type: 'progress',
      title: 'Carrier Performance',
      compact: true,
      items: [
        { title: 'SwiftLog', value: 98, right: '98%', tone: 'ok' },
        { title: 'AirFreight Co', value: 97, right: '97%', tone: 'ok' },
        { title: 'RoadWay Express', value: 94, right: '94%', tone: 'ok' },
        { title: 'OceanLink', value: 88, right: '88%', tone: 'low' },
      ],
    },
  },

  8: {
    nav: [['Dashboards', 'grid'], ['Reports', 'file'], ['KPIs', 'target'], ['Forecasts', 'trending'], ['Data Sources', 'database'], ['Alerts', 'bell']],
    action: 'Export Report',
    kpis: [
      { label: 'Revenue (YTD)', value: '$4.82M', delta: '+18%', tone: 'good', spark: [30, 36, 44, 50, 58, 64, 76] },
      { label: 'Gross Margin', value: '42.6%', delta: '+1.2 pts', tone: 'good', spark: [50, 52, 51, 54, 56, 55, 58] },
      { label: 'Customers', value: '12.4K', delta: '+9.3%', tone: 'good', spark: [40, 44, 48, 52, 56, 60, 64] },
      { label: 'Churn', value: '1.8%', delta: '-0.4 pts', tone: 'good', spark: [60, 58, 54, 50, 48, 44, 40] },
    ],
    primary: {
      type: 'area',
      title: 'Revenue Forecast',
      meta: 'AI prediction',
      labels: MONTHS,
      forecastFrom: 8,
      series: [
        { name: 'Revenue', values: [40, 46, 44, 52, 58, 56, 64, 70, 74, 80, 86, 93] },
      ],
    },
    secondary: {
      type: 'donut',
      title: 'Revenue by Region',
      center: ['$4.82M', 'YTD'],
      segments: [
        { label: 'North', value: 34 },
        { label: 'West', value: 29 },
        { label: 'South', value: 24 },
        { label: 'East', value: 13 },
      ],
    },
  },
};
