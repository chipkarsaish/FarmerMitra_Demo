document.addEventListener('DOMContentLoaded', () => {
    if (document.body.dataset.buyerPage !== 'dashboard') return;

    const dashboardGrid = document.querySelector('.dash-grid');
    if (!dashboardGrid || dashboardGrid.querySelector('.dash-column')) return;

    const panels = [...dashboardGrid.children];
    if (panels.length !== 4) return;

    const demandColumn = document.createElement('div');
    const activityColumn = document.createElement('div');
    demandColumn.className = 'dash-column';
    activityColumn.className = 'dash-column';

    demandColumn.append(panels[0], panels[2]);
    activityColumn.append(panels[1], panels[3]);
    dashboardGrid.append(demandColumn, activityColumn);
});
