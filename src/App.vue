<template>
  <ElConfigProvider :locale="locale">
    <router-view />
  </ElConfigProvider>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, watch } from 'vue'
import locale from 'element-plus/lib/locale/lang/zh-cn'
import { ElConfigProvider } from 'element-plus'
import { changeThemeDefaultColor } from '/@/utils/changeThemeColor'
import { ITheme, ISaleDialog } from '/@/type/config/theme'
import { salerDialog } from '/@/config/theme'
import theme from '/@/config/theme'
import { useLayoutStore } from '/@/store/modules/layout'

export default defineComponent({
  name: 'App',
  components: {
    ElConfigProvider
  },
  setup() {
    changeThemeDefaultColor()
    const { getSetting } = useLayoutStore()

    // 重新获取主题色
    const f = () => {
      let themeArray = theme()
      return getSetting.theme >= themeArray.length
        ? themeArray[0]
        : themeArray[getSetting.theme]
    }
    const s = () => {
      let salerDialogArray = salerDialog()
      return getSetting.salerDialogType >= salerDialogArray.length
        ? salerDialogArray[0]
        : salerDialogArray[getSetting.salerDialogType]
    }

    let themeStyle: Ref<ITheme> = ref(f())
    let salerDialogStyle: Ref<ISaleDialog> = ref(s())
    watch(
      () => getSetting.theme,
      () => (themeStyle.value = f())
    )
    watch(
      () => getSetting.salerDialogType,
      () => (salerDialogStyle.value = s())
    )
    watch(
      () => getSetting.color.primary,
      () => (themeStyle.value = f())
    )

    return {
      locale,
      themeStyle,
      getSetting,
      salerDialogStyle
    }
  }
})
</script>

<style lang="postcss">
.salerDialog {
  .bg {
    background: v-bind(salerDialogStyle.diaogBg);
  }
  .from-title {
    color: v-bind(salerDialogStyle.diaogTitle);
  }

  .form-top {
    background-image: v-bind(salerDialogStyle.diaogTop);
  }
  .form-bottom {
    background-image: v-bind(salerDialogStyle.diaogBottom);
  }
  .el-card {
    .el-button {
      background: v-bind(salerDialogStyle.cardBut);
      &:focus {
        background-color: v-bind(salerDialogStyle.cardButHover);
      }
      &:hover {
        background-color: v-bind(salerDialogStyle.cardButHover);
        border-color: v-bind(salerDialogStyle.cardButHover);
      }
      &:active {
        background-color: v-bind(salerDialogStyle.cardButHover);
        border-color: v-bind(salerDialogStyle.cardButHover);
      }
    }
    .el-card__header {
      .card-header {
        .header-left {
          background: v-bind(salerDialogStyle.cardHeaderdLeft);
          color: v-bind(salerDialogStyle.cardFontColor);
        }
        .header-right {
          background: v-bind(salerDialogStyle.cardHeaderdRight);
        }
      }
    }
  }
}
.layout-sidebar-sidesetting > i {
  background-color: v-bind(themeStyle.sidebarActiveBg);
  color: v-bind(themeStyle.sidebarColor);
}

.layout-sidebar {
  background-color: v-bind(themeStyle.sidebarBg);

  .layout-sidebar-logo {
    background-color: v-bind(themeStyle.logoBg || themeStyle.sidebarBg);
    color: v-bind(themeStyle.logoColor || themeStyle.sidebarColor);
  }

  .el-menu {
    background-color: v-bind(themeStyle.sidebarBg);
    border-right: 0;

    .el-menu {
      background-color: v-bind(themeStyle.sidebarChildrenBg);
    }
  }

  .el-sub-menu__title {
    color: v-bind(themeStyle.sidebarColor);
  }

  .el-menu-item {
    color: v-bind(themeStyle.sidebarColor);
  }

  .el-menu-item:focus,
  .el-menu-item:hover,
  .el-sub-menu__title:hover {
    background-color: transparent;
    color: v-bind(themeStyle.sidebarActiveColor);
  }

  .el-menu-item-group__title {
    padding: 0;
  }

  .el-menu-item.is-active {
    background-color: v-bind(themeStyle.sidebarActiveBg);
    color: v-bind(themeStyle.sidebarActiveColor);
    border-right: 3px solid v-bind(themeStyle.sidebarActiveBorderRightBg);
    position: relative;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      width: 0;
      border-width: 3px;
      border-style: solid;
      /* border-color: v-bind(themeStyle.sidebarChildrenBg); */
      border-color: #58e2f8;
    }
  }

  .el-sub-menu.is-active > .el-sub-menu__title,
  .el-sub-menu.is-active > .el-sub-menu__title > i {
    color: v-bind(themeStyle.sidebarActiveColor);
  }
}

.layout-main-navbar {
  background-color: v-bind(
    getSetting.mode === 'vertical' || getSetting.isPhone ? themeStyle.navbarBg:
      themeStyle.sidebarBg
  );
  color: v-bind(
    getSetting.mode === 'vertical' || getSetting.isPhone ?
      themeStyle.navbarColor: themeStyle.sidebarColor
  );

  .el-breadcrumb .el-breadcrumb__inner,
  .el-breadcrumb .el-breadcrumb__separator,
  .el-breadcrumb .el-breadcrumb__inner:hover,
  .el-breadcrumb .el-breadcrumb__separator:hover,
  .el-dropdown {
    color: v-bind(themeStyle.navbarColor);
  }

  .layout-sidebar-menubar {
    .el-menu {
      background-color: v-bind(themeStyle.sidebarBg);
      border-right: 0;
    }

    .el-menu--horizontal {
      & > .el-menu-item {
        color: v-bind(themeStyle.sidebarColor);
      }

      & > .el-sub-menu .el-sub-menu__title {
        color: v-bind(themeStyle.sidebarColor);
      }

      .el-menu-item:not(.is-disabled):focus,
      .el-menu-item:not(.is-disabled):hover {
        background-color: v-bind(themeStyle.sidebarActiveBg);
        color: v-bind(themeStyle.sidebarActiveColor);
      }

      & > .el-sub-menu .el-sub-menu__title:hover {
        background-color: v-bind(themeStyle.sidebarActiveBg);
        color: v-bind(themeStyle.sidebarActiveColor);
      }

      & > .el-menu-item-group__title {
        padding: 0;
      }

      & > .el-menu-item.is-active {
        background-color: v-bind(themeStyle.sidebarActiveBg);
        color: v-bind(themeStyle.sidebarActiveColor) !important;
        border-right: 3px solid v-bind(themeStyle.sidebarActiveBorderRightBg);
      }

      & > .el-sub-menu.is-active > .el-sub-menu__title,
      & > .el-sub-menu.is-active > .el-sub-menu__title > i {
        color: v-bind(themeStyle.sidebarActiveColor);
      }
    }
  }
}

.layout-main-tags {
  background-color: v-bind(themeStyle.tagsbg);
  color: v-bind(themeStyle.tagsColor);

  .layout-tags-active {
    background-color: v-bind(themeStyle.tagsActiveBg);
    color: v-bind(themeStyle.tagsActiveColor);
  }
}

.layout-main-content {
  background-color: v-bind(themeStyle.mainBg);
}

.el-popper {
  .el-menu-item-group__title {
    padding: 0;
  }
}
/* 弹窗头部 */
.bf-window-header-bg {
  background-color: v-bind(themeStyle.sidebarBg);
  color: v-bind(themeStyle.sidebarColor);
}
.bf-table-content {
  .el-table thead.is-group th.el-table__cell {
    background-color: v-bind(themeStyle.sidebarBg) !important;
    color: v-bind(themeStyle.sidebarColor) !important;
  }
  .el-table__header,
  .el-table__fixed-header-wrapper {
    th {
      background-color: v-bind(themeStyle.sidebarBg) !important;
      color: v-bind(themeStyle.sidebarColor) !important;
    }
  }
  .el-table__column-filter-trigger i {
    color: v-bind(themeStyle.sidebarColor) !important;
  }
}
</style>
