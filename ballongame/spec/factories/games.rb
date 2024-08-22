# spec/factories/games.rb
FactoryBot.define do
  factory :game do
    playerName { "Iceapple" }
    score { 10 }
    # published_at { Time.now }

    # You can define traits to create variations of your factory
    # trait :unpublished do
    #   published_at { nil }
    # end

    # trait :with_long_body do
    #   body { "This is a much longer body text that goes on and on..." }
    # end
  end
end