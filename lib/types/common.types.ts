export interface IMessagePayload {
  id: string;
  text: string;
  user: {
    display_name: string;
    profile_url: string | null;
  };
  user_id: string;
  created_at: Date;
}
