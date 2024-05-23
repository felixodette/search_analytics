require 'rails_helper'

RSpec.describe SearchController, type: :controller do
    describe "POST #create" do
        it "creates a new search" do
            expect {
                post :create, params: { search: { query: "What is a good car", ip_address: "127.0.0.1"}}
        }.to change(Search, :count).by(1)
    end
end
