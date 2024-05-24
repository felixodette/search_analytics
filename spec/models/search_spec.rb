require 'rails_helper'

RSpec.describe Search, type: :model do
    it "is valid with a query and ip_address" do
        search = Search.new(query: "Causes of Post Election Violence in Kenya", ip_address: "127.0.0.1")
        expect(search).to be_valid
    end

    it "is invalid without a query" do
        search = Search.new(query: nil, ip_address: "127.0.0.1")
        expect(search).not_to be_valid
    end

    it 'is invalid without an ip_address' do
        search = Search.new(query: 'Causes of Post Election Violence in Kenya', ip_address: nil)
        expect(search).not_to be_valid
    end
end
