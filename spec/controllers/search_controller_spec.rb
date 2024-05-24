# spec/controllers/searches_controller_spec.rb
require 'rails_helper'

RSpec.describe SearchesController, type: :controller do
  describe "POST #create" do
    context "with valid params" do
      it "creates a new search" do
        expect {
          post :create, params: { search: { query: "What is a good car", ip_address: "127.0.0.1" } }
        }.to change(Search, :count).by(1)
      end

      it "returns http success" do
        post :create, params: { search: { query: "What is a good car", ip_address: "127.0.0.1" } }
        expect(response).to have_http_status(:ok)
      end
    end

    context "with invalid params" do
      it "does not create a new search" do
        expect {
          post :create, params: { search: { query: "", ip_address: "" } }
        }.to_not change(Search, :count)
      end

      it "returns http unprocessable_entity" do
        post :create, params: { search: { query: "", ip_address: "" } }
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end

  describe "GET #index" do
    before do
      @search1 = Search.create(query: "What is a good car", ip_address: "127.0.0.1")
      @search2 = Search.create(query: "How is emil hajric doing", ip_address: "127.0.0.1")
    end

    it "returns http success" do
      get :index
      expect(response).to have_http_status(:ok)
    end

    it "returns search analytics" do
      get :index
      puts "Response body: #{response.body}"  # Debug statement to print the response body
      analytics = JSON.parse(response.body)
      queries = analytics.map { |search| search[0] }
      expect(queries).to include(@search1.query, @search2.query)
    end
  end
end
