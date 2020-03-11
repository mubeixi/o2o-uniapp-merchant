import Vue from 'vue';

import {
  Menu,
  MenuItem,
  MenuItemGroup,
  Submenu,
  Alert,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Carousel,
  CarouselItem,
  Checkbox,
  CheckboxGroup,
  Col,
  ColorPicker,
  DatePicker,
  Dialog,
  Form,
  FormItem,
  Input,
  Loading,
  Message,
  MessageBox,
  Notification,
  Option,
  Pagination,
  Radio,
  RadioButton,
  RadioGroup,
  Select,
  Slider,
  Switch,
  Table,
  TableColumn,
  TabPane,
  Tabs,
  TimePicker,
  Tooltip,
  Tree,
  Upload,
  Autocomplete,
  Progress,
  InfiniteScroll,
  InputNumber,
  Timeline,
  TimelineItem,
  Row,
  Tag,
  Image,
  Popover,
} from 'element-ui';
import FunTable from '@/components/widget/FunTable.vue';

Vue.component('fun-table', FunTable);

Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Popover);
Vue.use(Tag);
Vue.use(Row);
Vue.use(Timeline);
Vue.use(TimelineItem);
Vue.use(InputNumber);
Vue.use(InfiniteScroll);
Vue.use(Progress);
Vue.use(Autocomplete);
Vue.use(Input);
Vue.use(Button);
Vue.use(Pagination);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Loading.directive);
Vue.use(Radio);
Vue.use(Dialog);
Vue.use(Form);
Vue.use(Alert);
Vue.use(FormItem);
Vue.use(Upload);
Vue.use(Select);
Vue.use(Option);
Vue.use(RadioGroup);
Vue.use(RadioButton);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Tree);
Vue.use(Tooltip);
Vue.use(Switch);
Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(TimePicker);
Vue.use(Col);
Vue.use(DatePicker);
Vue.use(CheckboxGroup);
Vue.use(Checkbox);
Vue.use(ColorPicker);
Vue.use(Slider);
Vue.use(TableColumn);
Vue.use(Table);
Vue.use(Image);

Vue.prototype.$loading = Loading.service;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
