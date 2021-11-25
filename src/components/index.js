import {defineAsyncComponent} from 'vue'

import formBuilder from "./formBuilder";


export  const GlobalComponents = {
    VButton: defineAsyncComponent(() => import('../components/base/button/VButton.vue')),
    Dashboard: defineAsyncComponent(() => import('../components/pages/dashboards/business/CompanyDashboard.vue')),
    VMessage: defineAsyncComponent(() => import('../components/base/message/VMessage.vue')),
    VIconWrap: defineAsyncComponent(() => import('../components/base/icon/VIconWrap.vue')),
    // LanguagesPanel: defineAsyncComponent(() => import('../components/partials/panels/LanguagesPanel.vue')),
    AnimatedLogo: defineAsyncComponent(() => import('../components/svg/AnimatedLogo.vue')),
    // Toolbar: defineAsyncComponent(() => import('../components/partials/toolbars/Toolbar.vue')),
    ToolbarNotification: defineAsyncComponent(() => import('../components/partials/toolbars/ToolbarNotification.vue')),
    DashboardsSubsidebar: defineAsyncComponent(() => import('../layouts/sidebar-subsidebar/DashboardsSubsidebar.vue')),
    VTabs: defineAsyncComponent(() => import('../components/base/tabs/VTabs.vue')),
    VField: defineAsyncComponent(() => import('../components/base/form/VField.vue')),
    VSwitchBlock: defineAsyncComponent(() => import('../components/base/form/VSwitchBlock.vue')),
    VControl: defineAsyncComponent(() => import('../components/base/form/VControl.vue')),
    VAvatar: defineAsyncComponent(() => import('../components/base/avatar/VAvatar.vue')),
    DashboardsMobileSubsidebar: defineAsyncComponent(() => import('../layouts/mobile-subsidebars/DashboardsMobileSubsidebar.vue')),
    NotificationsMobileDropdown: defineAsyncComponent(() => import('../components/partials/dropdowns/NotificationsMobileDropdown.vue')),
    Sidebar: defineAsyncComponent(() => import('../components/navigation/desktop/Sidebar.vue')),
    UserProfileDropdown: defineAsyncComponent(() => import('../components/partials/dropdowns/UserProfileDropdown.vue')),
    MobileNavbar: defineAsyncComponent(() => import('../components/navigation/mobile/MobileNavbar.vue')),
    MobileSidebar: defineAsyncComponent(() => import('../components/navigation/mobile/MobileSidebar.vue')),
    VIcon: defineAsyncComponent(() => import('../components/base/icon/VIcon.vue')),
    VIconBox: defineAsyncComponent(() => import('../components/base/icon/VIconBox.vue')),
    VIconButton: defineAsyncComponent(() => import('../components/base/button/VIconButton.vue')),
    VDropdown: defineAsyncComponent(() => import('../components/base/dropdown/VDropdown.vue')),
    // CircularMenu: defineAsyncComponent(() => import('../components/partials/circular-menu/CircularMenu.vue')),
    VBlock: defineAsyncComponent(() => import('../components/base/block/VBlock.vue')),
    UIWidget: defineAsyncComponent(() => import('../components/partials/widgets/ui-creative/UIWidget.vue')),
    ...formBuilder,
};