<script>
    import {defineProps, ref, watch, watchPostEffect, withDefaults} from 'vue'
    import {useRoute} from 'vue-router'
    import {Icon} from '@iconify/vue';
    import {activePanel} from '../state/activePanelState'
    import {pageTitle} from '../state/sidebarLayoutState'

    export default {
        components: {
            Icon
        },
        setup() {
            let menuItems = ref([
                {
                    key: "dashboard",
                    label: "dashboard",
                    icon: "feather:activity",
                }
            ]);
            let props = withDefaults(
                defineProps(),
                {
                    defaultSidebar: 'dashboard',
                    theme: 'default',
                    openOnMounted: false
                }
            );
            if (!props)
                props = {
                    defaultSidebar: 'dashboard',
                    theme: 'default',
                    openOnMounted: false
                };
            let route = useRoute();
            let isMobileSidebarOpen = ref(false);
            let isDesktopSidebarOpen = ref((props && props.openOnMounted ? props.openOnMounted : false))
            let activeMobileSubsidebar = ref(props && props.defaultSidebar ? props.defaultSidebar : "dashboard")

            function switchSidebar(id) {
                if (id === activeMobileSubsidebar.value)
                    isDesktopSidebarOpen.value = !isDesktopSidebarOpen.value
                else {
                    isDesktopSidebarOpen.value = true
                    activeMobileSubsidebar.value = id
                }
            }

            /**
             * watchPostEffect callback will be executed each time dependent reactive values has changed
             */
            watchPostEffect(() => {
                const isOpen = isDesktopSidebarOpen.value
                const wrappers = document.querySelectorAll('.view-wrapper')

                wrappers.forEach((wrapper) => {
                    if (isOpen === false) {
                        wrapper.classList.remove('is-pushed-full')
                    } else if (!wrapper.classList.contains('is-pushed-full')) {
                        wrapper.classList.add('is-pushed-full')
                    }
                })
            });
            watch(
                () => route.fullPath,
                () => {
                    isMobileSidebarOpen.value = false

                    if (props.closeOnChange && isDesktopSidebarOpen.value) {
                        isDesktopSidebarOpen.value = false
                    }
                }
            );

            return {
                props,
                switchSidebar,
                activeMobileSubsidebar,
                isDesktopSidebarOpen,
                route,
                isMobileSidebarOpen,
                activePanel,
                pageTitle,
                menuItems,
            }
        }
    }
</script>
<style>
    .sidebar-icon {
        color: var(--title-grey);
        stroke-width: 1.6px;
        transition: all 0.3s;
        height: 20px !important;
        width: 20px !important;
    }
</style>
<template>
    <div class="sidebar-layout">
        <div class="app-overlay"></div>

        <!-- Mobile navigation -->
        <MobileNavbar
                :is-open="isMobileSidebarOpen"
                @toggle="isMobileSidebarOpen = !isMobileSidebarOpen">
            <template #brand>
                <RouterLink :to="{ name: 'dashboard' }" class="navbar-item is-brand">
                    <AnimatedLogo width="38px" height="38px"/>
                </RouterLink>

                <div class="brand-end">
                    <NotificationsMobileDropdown/>
                    <UserProfileDropdown/>
                </div>
            </template>
        </MobileNavbar>

        <!-- Mobile sidebar links -->
        <MobileSidebar :is-open="isMobileSidebarOpen" @toggle="isMobileSidebarOpen = !isMobileSidebarOpen">
            <template #links>
                <li>
                    <RouterLink :to="{ name: 'dashboard' }">
                        <i aria-hidden="true" class="iconify" data-icon="feather:home"></i>
                    </RouterLink>
                </li>
            </template>
            <template #bottom-links>
                <li>
                    <a href="#">
                        <i aria-hidden="true"
                           class="iconify"
                           data-icon="feather:settings"
                        ></i>
                    </a>
                </li>
            </template>
        </MobileSidebar>

        <!-- Mobile subsidebar links -->
        <transition name="slide-x">
            <DashboardsMobileSubsidebar v-if="isMobileSidebarOpen && activeMobileSubsidebar === 'dashboard'"/>
        </transition>

        <Sidebar :theme="props.theme" :is-open="isDesktopSidebarOpen">
            <template #links>
                <!-- Dashboards -->
                <li v-for="item in menuItems">
                    <a :class="[activeMobileSubsidebar === item.key && 'is-active']"
                       :data-content="trans(item.label??item.key)"
                       :aria-label="trans(item.label??item.key)"
                       @click="switchSidebar(item.key)">
                        <Icon class="sidebar-icon" :icon="item.icon"/>
                    </a>
                </li>

                <!-- Layouts -->
                <li>
                    <a :class="[activeMobileSubsidebar === 'layout' && 'is-active']"
                       data-content="Layouts"
                       aria-label="View layouts"
                       @click="switchSidebar('layout')">
                        <Icon class="sidebar-icon" icon="feather:grid"/>
                    </a>
                </li>

                <!-- Elements -->
                <li>
                    <a
                            :class="[activeMobileSubsidebar === 'elements' && 'is-active']"
                            data-content="Elements"
                            aria-label="View elements"
                            @click="switchSidebar('elements')"
                    >
                        <Icon class="sidebar-icon" icon="feather:box"/>

                    </a>
                </li>

                <!-- Components -->
                <li>
                    <a
                            :class="[activeMobileSubsidebar === 'components' && 'is-active']"
                            data-content="Components"
                            aria-label="View components"
                            @click="switchSidebar('components')"
                    >
                        <Icon class="sidebar-icon" icon="feather:cpu"/>

                    </a>
                </li>

                <!-- Messaging -->
                <li>
                    <RouterLink
                            id="open-messages"
                            :to="{ name: 'dashboard' }"
                            data-content="Messaging"
                    >
                        <!--<i-->
                        <!--aria-hidden="true"-->
                        <!--class="iconify sidebar-svg"-->
                        <!--data-icon="feather:message-circle"-->
                        <!--&gt;</i>-->
                        <Icon class="sidebar-icon" icon="feather:message-circle"/>

                    </RouterLink>
                </li>
            </template>

            <template #bottom-links>

                <!-- Search -->
                <li class="right-panel-trigger is-hidden-touch">
                    <a
                            aria-label="Display search panel"
                            data-content="Search"
                            @click="activePanel = 'search'"
                    >
                        <Icon class="sidebar-icon" icon="feather-search"/>

                        <!--<i-->
                        <!--aria-hidden="true"-->
                        <!--class="iconify sidebar-svg"-->
                        <!--data-icon="feather-search"-->
                        <!--/>-->
                    </a>
                    <a
                            aria-label="Close all panels"
                            class="is-hidden is-inactive"
                            @click="activePanel = 'none'"
                    >
                        <Icon class="sidebar-icon" icon="feather-x"/>

                        <!--<i-->
                        <!--aria-hidden="true"-->
                        <!--class="iconify sidebar-svg"-->
                        <!--data-icon="feather-x"-->
                        <!--/>-->
                    </a>
                </li>

                <!-- Settings -->
                <li class="is-hidden-touch">
                    <RouterLink
                            id="open-settings"
                            :to="{ name: 'dashboard' }"
                            data-content="Settings"
                    >
                        <Icon class="sidebar-icon" icon="feather:settings"/>

                        <!--<i-->
                        <!--aria-hidden="true"-->
                        <!--class="iconify sidebar-svg"-->
                        <!--data-icon="feather:settings"-->
                        <!--&gt;</i>-->
                    </RouterLink>
                </li>

                <!-- Profile Dropdown -->
                <li>
                    <UserProfileDropdown up/>
                </li>
            </template>
        </Sidebar>

        <!-- Desktop navigation -->
        <CircularMenu />

        <transition name="slide-x">
            <DashboardsSubsidebar
                    v-if="isDesktopSidebarOpen && activeMobileSubsidebar === 'dashboard'"
                    @close="isDesktopSidebarOpen = false"
            />
        </transition>

        <LanguagesPanel/>

        <div class="view-wrapper">
            <div class="page-content-wrapper">
                <template v-if="props.nowrap">
                    <slot></slot>
                </template>
                <div v-else class="page-content is-relative">
                    <div class="page-title has-text-centered">
                        <!-- Sidebar Trigger -->
                        <div class="vuero-hamburger nav-trigger push-resize"
                             @click="isDesktopSidebarOpen = !isDesktopSidebarOpen"
                        >
              <span class="menu-toggle has-chevron">
                <span
                        :class="[isDesktopSidebarOpen && 'active']"
                        class="icon-box-toggle"
                >
                  <span class="rotate">
                    <i aria-hidden="true" class="icon-line-top"></i>
                    <i aria-hidden="true" class="icon-line-center"></i>
                    <i aria-hidden="true" class="icon-line-bottom"></i>
                  </span>
                </span>
              </span>
                        </div>

                        <div class="title-wrap">
                            <h1 class="title is-4">{{ pageTitle }}</h1>
                        </div>

                        <Toolbar class="desktop-toolbar">
                            <ToolbarNotification/>

                            <a
                                    class="toolbar-link right-panel-trigger"
                                    aria-label="View activity panel"
                                    @click="activePanel = 'activity'"
                            >
                                <!--<i-->
                                <!--aria-hidden="true"-->
                                <!--class="iconify"-->
                                <!--data-icon="feather:grid"-->
                                <!--&gt;</i>-->
                                <Icon icon="feather:grid"/>

                            </a>
                        </Toolbar>
                    </div>

                    <router-view></router-view>
                    <slot></slot>
                </div>
            </div>
        </div>
    </div>
</template>
