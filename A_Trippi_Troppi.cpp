    // Vaibhav Dangaich
    #include <bits/stdc++.h>
    using namespace std;
    #define int long long
    #define all(x) (x).begin(), (x).end()
    typedef long double lld;
    #define FORL(i, a, b) for (int i = a; i < b; i++)
    #define FORU(i, a, b) for (int i = a; i >= b; i--)
     
    #ifndef ONLINE_JUDGE
    #define debugpair(v)                                        \
        for (auto i : {1 : v})                                  \
        {                                                       \
            cerr << "(" << i.first << ", " << i.second << ") "; \
        }                                                       \
        cerr << endl;
    #define debugvar(x) cerr << #x << " -> " << x << "\n";
    // int convertedInt = stoi(strNumber)
    // string convertedString =to_string(num)
    #define debugcont(v)        \
        cerr << #v << " -> [ "; \
        for (const auto &i : v) \
            cerr << i << " ";   \
        cerr << "]\n";
    #define fastio()
    #else
    #define var(x)
    #define cont(v)
    #define fastio()                      \
        ios_base::sync_with_stdio(false); \
        cin.tie(NULL);                    \
        cout.tie(NULL);
    #endif
     
    void solve();
    signed main()
    {
     
        fastio()
     
            int test = 1;
        cin >> test;
        cin.ignore();
        while (test--)
            solve();
    }
     
    void solve()
    {
        string s;
        vector<char>ans;
        getline(cin,s);
        stringstream ss(s);
        string word;
      while(ss>>word){
        ans.push_back(word[0]);
      }
        for(int i=0;i<ans.size();i++){
            cout<<ans[i];
        }
        cout<<"\n";
    }