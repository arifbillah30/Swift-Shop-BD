import { invoiceList } from "./invoices";
import { projects, projectListData, OverviewTeamMember, projectAssignedTo } from "./projects";
import { tasks, recentTasksData, AddTeamMember } from "./tasks";
import {
  inboxmails,
  starredmails,
  importantmails,
  draftmails,
  sentmails,
  trashmails,
  mailDB,
  labelsData,
  mailChatData
} from "./mails";
import {
  cartData,
  comments,
  customerData,
  discountData,
  orders,
  productsData,
  recentProducts,
  shops,
  productComments
} from "./ecommerce";
import { chats, contacts, groups, messages } from "./chat";
import { calenderDefaultCategories, events } from "./calender";
import { users, userProfile } from "./contacts";
import { dahsboardEmail, activityData, latestTransaction, TopCitiesSelling } from "./dashboard";
import { jobs, jobListCandidate, jobApply } from "./job";

import { filesData, filemanagerData, storageData } from "./file-manager";

import { categoriesData, archiveData, popularPosts, tagsData } from "./blog";

import { jobsGridData, experienceData, jobType } from "./job-Grid";

export {
  jobsGridData,
  experienceData,
  jobType,
  tagsData,
  categoriesData,
  archiveData,
  popularPosts,
  AddTeamMember,
  recentTasksData,
  mailChatData,
  labelsData,
  storageData,
  filemanagerData,
  filesData,
  activityData,
  latestTransaction,
  productsData,
  discountData,
  events,
  calenderDefaultCategories,
  chats,
  groups,
  contacts,
  messages,
  orders,
  cartData,
  customerData,
  shops,
  recentProducts,
  comments,
  inboxmails,
  importantmails,
  draftmails,
  sentmails,
  trashmails,
  starredmails,
  invoiceList,
  projects,
  projectListData,
  TopCitiesSelling,
  OverviewTeamMember,
  projectAssignedTo,
  tasks,
  users,
  userProfile,
  dahsboardEmail,
  productComments,
  jobs,
  jobListCandidate,
  jobApply,
  mailDB
};