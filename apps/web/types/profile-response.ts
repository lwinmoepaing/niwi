export interface GitHubProfileResponse {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  name: string;
  company: string;
  blog: string;
  location: string;
  email?: string;
  hireable?: unknown;
  bio: string;
  twitter_username: string;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}

export interface YoutubeResponse {
  kind: string;
  etag: string;
  pageInfo: YoutubePageInfo;
  items: YoutubeItem[];
}

export interface YoutubePageInfo {
  totalResults: number;
  resultsPerPage: number;
}

export interface YoutubeItem {
  kind: string;
  etag: string;
  id: string;
  snippet: YoutubeSnippet;
  statistics: YoutubeStatistics;
}

export interface YoutubeSnippet {
  title: string;
  description: string;
  customUrl: string;
  publishedAt: string;
  thumbnails: YoutubeThumbnails;
  localized: YoutubeLocalized;
}

export interface YoutubeThumbnails {
  default: YoutubeDefault;
  medium: YoutubeMedium;
  high: YoutubeHigh;
}

export interface YoutubeDefault {
  url: string;
  width: number;
  height: number;
}

export interface YoutubeMedium {
  url: string;
  width: number;
  height: number;
}

export interface YoutubeHigh {
  url: string;
  width: number;
  height: number;
}

export interface YoutubeLocalized {
  title: string;
  description: string;
}

export interface YoutubeStatistics {
  viewCount: string;
  subscriberCount: string;
  hiddenSubscriberCount: boolean;
  videoCount: string;
}
